// Detetive (Estrela) official rooms and grid positions
export const boardRooms = [
  { name: 'Banco', color: '#2e8b57', x: 0, y: 0 },
  { name: 'Boate', color: '#ff6666', x: 1, y: 0 },
  { name: 'Cemitério', color: '#444444', x: 2, y: 0 },
  { name: 'Floricultura', color: '#ffb6c1', x: 3, y: 0 },
  { name: 'Hospital', color: '#87ceeb', x: 0, y: 1 },
  { name: 'Hotel', color: '#daa520', x: 1, y: 1 },
  { name: 'Mansão', color: '#9370db', x: 2, y: 1 },
  { name: 'Praça Central', color: '#7ed957', x: 3, y: 1 },
  { name: 'Prefeitura', color: '#ffe066', x: 0, y: 2 },
  { name: 'Restaurante', color: '#a67c52', x: 1, y: 2 },
  { name: 'Estação de Trem', color: '#708090', x: 2, y: 2 },
  { name: '', color: '#2a2a2a', x: 3, y: 2 }, // Empty cell
]

export const boardSize = 4 // 4x3 grid

// For movement, also export grid size and room lookup
export const getRoomByCoords = (x: number, y: number) =>
  boardRooms.find(r => r.x === x && r.y === y)
