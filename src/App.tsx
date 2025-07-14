import { useState } from 'react'
import './App.css'
import { boardRooms, boardSize } from './boardData'

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

  // Roll dice
  const rollDice = () => {
    setDice(Math.floor(Math.random() * 6) + 1)
  }

  return (
    <div className='detetive-table'>
      <h1>Detetive (Estrela) - Public Table</h1>

      <section className='board'>
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
                      background: room?.color || '#eee',
                      border: '1px solid #aaa',
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
              <span style={{ color: p.color, fontWeight: 'bold' }}>
                {p.name}
              </span>
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
      </section>

      {/* ...existing code for cards and dice... */}
      <section className='cards'>
        <h2>Distribute Cards</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {players.map(p => (
            <div key={p.name}>
              <strong>{p.name}</strong>
              <ul>
                {(cards[p.name] || []).map(card => (
                  <li key={card}>{card}</li>
                ))}
              </ul>
              <select
                onChange={e => giveCard(p.name, e.target.value)}
                defaultValue=''
              >
                <option value='' disabled>
                  Give card...
                </option>
                {allCards.map(card => (
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
        <div style={{ fontSize: '2rem' }}>🎲 {dice}</div>
        <button onClick={rollDice}>Roll Dice</button>
      </section>
    </div>
  )
}

export default App
