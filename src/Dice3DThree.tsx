import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Dice3DThreeProps {
  value: number
  rolling: boolean
  onAnimationEnd?: () => void
}

export default function Dice3DThree({
  value,
  rolling,
  onAnimationEnd,
}: Dice3DThreeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const rollKey = useRef(0)

  useEffect(() => {
    // Only increment rollKey when rolling starts (rolling becomes true)
    if (rolling) {
      rollKey.current += 1
    }
  }, [rolling])

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 220
    camera.position.y = 20
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)

    // Dice geometry and faces - arranged for Three.js BoxGeometry
    // BoxGeometry face order: right(+X), left(-X), top(+Y), bottom(-Y), front(+Z), back(-Z)
    const geometry = new THREE.BoxGeometry(30, 30, 30)
    const faceMaterials = [5, 6, 3, 4, 1, 2].map(n => {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#222'
      ctx.fillRect(0, 0, 128, 128)
      ctx.font = 'bold 64px Cinzel, serif'
      ctx.fillStyle = '#eaeaea'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = '#4e4e6a'
      ctx.shadowBlur = 12
      ctx.fillText(String(n), 64, 64)
      return new THREE.MeshPhongMaterial({
        map: new THREE.CanvasTexture(canvas),
      })
    })
    const diceMesh = new THREE.Mesh(geometry, faceMaterials)

    // Position dice at bottom from the start
    const cameraDistance = camera.position.z
    const fov = camera.fov * (Math.PI / 180)
    const screenHeight = 2 * Math.tan(fov / 2) * cameraDistance
    const bottomY = -screenHeight / 2 + 50 // 50 units from bottom edge
    diceMesh.position.y = bottomY

    scene.add(diceMesh)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const directional = new THREE.DirectionalLight(0xffffff, 0.7)
    directional.position.set(0, 100, 100)
    scene.add(directional)

    // Overlay
    if (mountRef.current) {
      mountRef.current.innerHTML = ''
      mountRef.current.appendChild(renderer.domElement)
    }

    // Dice face rotations - simple mapping for arranged materials
    const rotations: [number, number, number][] = [
      [0, 0, 0], // 1 - front face
      [0, Math.PI, 0], // 2 - back face
      [-Math.PI / 2, 0, 0], // 3 - top face
      [Math.PI / 2, 0, 0], // 4 - bottom face
      [0, -Math.PI / 2, 0], // 5 - right face
      [0, Math.PI / 2, 0], // 6 - left face
    ]
    let finalRotation: [number, number, number] = rotations[(value - 1) % 6]

    // Animation state - with 3s display time after rolling
    const start = performance.now()
    const duration = 1200
    const displayDuration = 3000 // 3 seconds to show final face
    let animating = rolling
    let showingFinal = false
    let finalStart = 0

    function animate(now: number) {
      const elapsed = now - start
      if (animating && elapsed < duration) {
        // Roll the dice at bottom position
        diceMesh.rotation.x = Math.PI * 2 * (elapsed / duration) + Math.random()
        diceMesh.rotation.y = Math.PI * 2 * (elapsed / duration) + Math.random()
        diceMesh.rotation.z = Math.PI * 2 * (elapsed / duration) + Math.random()
      } else if (animating) {
        // Animation ended, set final face and start display timer
        diceMesh.rotation.x = finalRotation[0]
        diceMesh.rotation.y = finalRotation[1]
        diceMesh.rotation.z = finalRotation[2]
        animating = false
        showingFinal = true
        finalStart = now
      } else if (showingFinal) {
        // Show final face for 3 seconds, then disappear
        const finalElapsed = now - finalStart
        if (finalElapsed >= displayDuration) {
          showingFinal = false
          // Call onAnimationEnd to make dice disappear
          onAnimationEnd && onAnimationEnd()
        }
      }
      renderer.render(scene, camera)
      // Keep rendering while animating or showing final face
      if (animating || showingFinal) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationRef.current!)
      renderer.dispose()
      geometry.dispose()
      faceMaterials.forEach(m => m.dispose())
      scene.clear()
    }
  }, [rollKey.current, value]) // Only restart when rollKey changes (new roll started)

  return (
    <div
      className='dice3d-overlay'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div ref={mountRef} />
    </div>
  )
}
