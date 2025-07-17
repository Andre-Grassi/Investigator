# Detetive (Estrela) Public Table Web App

This project is a digital public table for the Detetive board game. It allows users to:

- Control player positions on the board
- Distribute cards to players with secret envelope functionality
- Roll dice with 3D animations
- View the game state in real time
- Generate and reveal the secret solution

## Tech Stack

- Frontend: React + TypeScript (Vite)
- 3D Graphics: Three.js for dice animations
- Styling: Modern CSS with detective theme

## Features

- 🎯 **Secret Envelope**: Automatically generates crime solution (person, weapon, place)
- 🎲 **3D Dice**: Realistic dice rolling with physics animations
- 👁️ **Card Privacy**: Toggle card visibility per player
- 🔄 **Card Distribution**: Flexible card shuffling between selected players
- 🏗️ **Interactive Board**: Visual game board with player positions
- 🎨 **Detective Theme**: Modern, mysterious styling

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy using GitHub Actions (automatic on push to main) or manually:
   ```bash
   npm run deploy
   ```

The app will be available at: `https://[username].github.io/Investigator/`

## GitHub Pages Setup

The project is configured for GitHub Pages with:

- Vite base path set to `/Investigator/`
- GitHub Actions workflow for automatic deployment
- Built files in `dist/` directory

2. Start the development server:
   ```bash
   npm run dev
   ```

## Features Planned

- Board UI with draggable player tokens
- Card distribution interface
- Dice rolling simulation
- Real-time updates for all players

## License

MIT
