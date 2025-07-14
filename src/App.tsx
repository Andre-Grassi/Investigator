import { useState } from 'react'
import Dice3DThree from './Dice3DThree'
import './App.css'
import { boardRooms, boardSize } from './boardData'

function shuffle<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
const defaultPlayers = [
  { name: 'Branco', color: 'white', position: 0 },
  { name: 'Verde', color: 'green', position: 1 },
  { name: 'Amarelo', color: 'yellow', position: 2 },
  { name: 'Azul', color: 'blue', position: 3 },
  { name: 'Vermelho', color: 'red', position: 4 },
  { name: 'Rosa', color: 'pink', position: 5 },
]

const allCards = [
  'Srta. Rosa',
  'Sr. Branco',
  'Srta. Violeta',
  'Sr. Verde',
  'Srta. Azul',
  'Sr. Mostarda',
  'Corda',
  'Cano',
  'Faca',
  'Revólver',
  'Veneno',
  'Peso',
  'Sala de Estar',
  'Sala de Jantar',
  'Cozinha',
  'Biblioteca',
  'Escritório',
  'Salão',
  'Jardim de Inverno',
  'Hall',
  'Sala de Música',
]

function App() {
  const [players, setPlayers] = useState(defaultPlayers)
  const [cards, setCards] = useState<{ [key: string]: string[] }>({})
  const [dice, setDice] = useState<number>(1)
  const [rolling, setRolling] = useState(false)
  const [pendingDice, setPendingDice] = useState<number | null>(null)
  const [showDice, setShowDice] = useState(false)

  // Callback for dice animation end
  const handleDiceAnimationEnd = () => {
    if (pendingDice !== null) {
      setDice(pendingDice)
      setPendingDice(null)
      setRolling(false)
      setShowDice(false) // Hide the dice after display period
    }
  }

  // Move player to a room
  const movePlayer = (idx: number, newPos: number) => {
    setPlayers(players =>
      players.map((p, i) => (i === idx ? { ...p, position: newPos } : p))
    )
  }

  // Distribute card to player
  const giveCard = (playerName: string, card: string) => {
    setCards(cards => {
      const newCards = { ...cards }
      if (!newCards[playerName]) newCards[playerName] = []
      if (!newCards[playerName].includes(card)) newCards[playerName].push(card)
      return newCards
    })
  }

  // Roll dice: generate random value, start rolling animation
  const rollDice = () => {
    if (rolling) return
    const newValue = Math.floor(Math.random() * 6) + 1
    setPendingDice(newValue)
    setRolling(true)
    setShowDice(true)
  }

  // Card visibility state per player
  const [visibleCards, setVisibleCards] = useState<{ [key: string]: boolean }>(
    {}
  )

  const toggleCards = (playerName: string) => {
    setVisibleCards(v => ({ ...v, [playerName]: !v[playerName] }))
  }
  // State for selected players to shuffle cards
  const [shufflePlayers, setShufflePlayers] = useState<string[]>([])

  // Shuffle cards among selected players
  const shuffleCardsBetweenPlayers = () => {
    // Shuffle all game cards between selected players
    if (shufflePlayers.length < 2) {
      alert('Selecione dois jogadores para embaralhar todas as cartas do jogo.')
      return
    }
    const shuffled = shuffle([...allCards])
    const newCards: { [key: string]: string[] } = { ...cards }
    // Clear cards for selected players
    shufflePlayers.forEach(name => {
      newCards[name] = []
    })
    // Distribute all cards evenly
    shuffled.forEach((card, i) => {
      const playerIdx = i % shufflePlayers.length
      const playerName = shufflePlayers[playerIdx]
      newCards[playerName].push(card)
    })
    setCards(newCards)
  }

  // Cleaned up: Only one shuffle function and one App component, with valid JSX
  return (
    <>
      <h2>Game Board</h2>
      <div className='board-grid'>
        {[...Array(boardSize)].map((_, row) => (
          <div className='board-row' key={row}>
            {[...Array(boardSize)].map((_, col) => {
              const roomIdx = row * boardSize + col
              const room = boardRooms[roomIdx]
              return (
                <div
                  className='board-cell'
                  key={col}
                  style={{
                    background: room?.color || '#222',
                    border: '1px solid #444',
                    minWidth: 100,
                    minHeight: 100,
                    position: 'relative',
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                    {room?.name}
                  </div>
                  {/* Show players in this room */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      left: 4,
                      display: 'flex',
                      gap: 4,
                    }}
                  >
                    {players
                      .filter(p => p.position === roomIdx)
                      .map(p => (
                        <span
                          key={p.name}
                          style={{
                            color: p.color,
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                          }}
                        >
                          ●
                        </span>
                      ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <h3>Move Players</h3>
        {players.map((p, idx) => (
          <div key={p.name} style={{ marginBottom: 8 }}>
            <span style={{ color: p.color, fontWeight: 'bold' }}>{p.name}</span>
            <select
              value={p.position}
              onChange={e => movePlayer(idx, Number(e.target.value))}
              style={{ marginLeft: 8 }}
            >
              {boardRooms.map((room, i) => (
                <option key={room.name} value={i}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <section className='cards'>
        <h2>Cartas dos Jogadores</h2>
        <div style={{ marginBottom: '1rem' }}>
          <div>Selecione dois jogadores para embaralhar cartas:</div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 8 }}>
            {players.map(p => (
              <label
                key={p.name}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <input
                  type='checkbox'
                  checked={shufflePlayers.includes(p.name)}
                  onChange={e => {
                    if (e.target.checked) {
                      if (shufflePlayers.length < 2) {
                        setShufflePlayers([...shufflePlayers, p.name])
                      }
                    } else {
                      setShufflePlayers(
                        shufflePlayers.filter(n => n !== p.name)
                      )
                    }
                  }}
                  disabled={
                    !shufflePlayers.includes(p.name) &&
                    shufflePlayers.length >= 2
                  }
                />
                {p.name}
              </label>
            ))}
          </div>
          <button
            onClick={shuffleCardsBetweenPlayers}
            disabled={shufflePlayers.length !== 2}
            style={{ marginLeft: 12, marginTop: 8 }}
          >
            Embaralhar cartas entre selecionados
          </button>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {players.map(p => (
            <div key={p.name} style={{ minWidth: 180 }}>
              <strong>{p.name}</strong>
              <button
                style={{
                  marginLeft: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => toggleCards(p.name)}
                title={
                  visibleCards[p.name] ? 'Esconder cartas' : 'Mostrar cartas'
                }
              >
                {visibleCards[p.name] ? '👁️' : '👁'}
              </button>
              {visibleCards[p.name] && (
                <ul>
                  {(cards[p.name] || []).map(card => (
                    <li key={card}>{card}</li>
                  ))}
                </ul>
              )}
              <select
                onChange={e => giveCard(p.name, e.target.value)}
                defaultValue=''
              >
                <option value='' disabled>
                  Dar carta manualmente...
                </option>
                {[...allCards].map(card => (
                  <option key={card} value={card}>
                    {card}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>
      <section className='dice'>
        <h2>Dice</h2>
        <div style={{ fontSize: '2rem' }}>
          {rolling ? (
            <span style={{ opacity: 0.5 }}>🎲 Rolling...</span>
          ) : (
            <>🎲 {dice}</>
          )}
        </div>
        <button onClick={rollDice} disabled={rolling}>
          Roll Dice
        </button>
        {/* Show 3D dice when rolling starts and keep it visible */}
        {showDice && (
          <Dice3DThree
            value={pendingDice ?? dice}
            rolling={rolling}
            onAnimationEnd={handleDiceAnimationEnd}
          />
        )}
      </section>
    </>
  )
}
export default App
