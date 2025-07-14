// Detetive (Estrela) official rooms and grid positions
export const boardRooms = [
  { name: 'Prefeitura', color: '#ffe066', x: 0, y: 0 }, // Sargento Bigode
  { name: 'Restaurante', color: '#a67c52', x: 1, y: 0 }, // Chef Tony Gourmet
  { name: 'Hospital', color: '#ffb3c6', x: 2, y: 0 }, // Dona Violeta
  { name: 'Cemitério', color: '#444444', x: 0, y: 1 }, // Sérgio Soturno
  { name: 'Praça', color: '#7ed957', x: 1, y: 1 }, // Senhor Marinho (center)
  { name: 'Mansão', color: '#5dade2', x: 2, y: 1 }, // Mordomo James
  { name: 'Boate', color: '#ff6666', x: 0, y: 2 }, // Srta. Rosa
  { name: 'Floricultura', color: '#fff', x: 1, y: 2 }, // Dona Branca
  { name: 'Delegacia', color: '#b2bec3', x: 2, y: 2 }, // Extra room for grid symmetry
]

export const boardSize = 3 // 3x3 grid

// For movement, also export grid size and room lookup
export const getRoomByCoords = (x: number, y: number) =>
  boardRooms.find(r => r.x === x && r.y === y)
