# Forge of the Fallen

A deck-building roguelike card game where you play as Khalenos, a legendary Spartan blacksmith defending a forge outpost between Heaven and Hell.

## 🎮 Game Overview

- **Genre:** Deck-building Roguelike Card Game
- **Theme:** Greek Mythology meets Heaven vs Hell (Pixel Art)
- **Core Loop:** Combat → Forge/Trade → Relocate → Combat
- **Win Condition:** Defeat Moloch in the final battle

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🎯 Features

- **Card Combat** - Energy-based card system with Attack, Defense, Forge, Hybrid, and Power cards
- **Spartan Trading** - Trade cards to elite Spartans for permanent blessings
- **Procedural Maps** - 4 Acts with node-based progression
- **Pixel Art Aesthetic** - Greek mythology meets Heaven vs Hell

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **Zustand** - State Management
- **Framer Motion** - Animations

## 📁 Project Structure

```
forge-of-the-fallen/
├── src/
│   ├── components/     # React UI components
│   │   ├── combat/     # Combat screen
│   │   ├── map/        # Map screen
│   │   ├── cards/      # Card display
│   │   └── ui/         # Shared UI
│   ├── data/           # Game content
│   │   └── cards/      # Card definitions
│   ├── engine/         # Core game logic
│   │   ├── combat/     # Combat system
│   │   ├── map/        # Map generation
│   │   └── state/      # State management
│   ├── types/          # TypeScript interfaces
│   └── utils/          # Helper functions
├── tests/              # Test files
├── public/             # Static assets
└── docs/               # Documentation
```

## 🎨 Visual Design

- **Color Palette:**
  - Divine/Heaven: Gold, White, Sky Blue
  - Mortal/Spartan: Bronze, Crimson, Marble
  - Hell/Infernal: Blood Red, Obsidian, Ember

- **Card Types:**
  - ⚔️ Attack (Red)
  - 🛡️ Defense (Blue)
  - 🔥 Forge (Orange)
  - ⚡ Hybrid (Purple)
  - ✨ Power (Gold)

## 📖 Documentation

- [AI_README.md](./AI_README.md) - Development guide for AI assistants
- [TESTING.md](./TESTING.md) - Testing methodology
- [SECURITY.md](./SECURITY.md) - Security guidelines
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## 🎯 Development Roadmap

### Phase 1: Prototype (Current)
- [x] Project setup
- [x] Core type definitions
- [x] Basic UI components
- [x] State management
- [ ] Combat engine
- [ ] Full card library

### Phase 2: Alpha
- [ ] All 4 Acts
- [ ] All enemies/bosses
- [ ] Spartan trading system
- [ ] Save/load system

### Phase 3: Beta
- [ ] Balance pass
- [ ] Audio/visual polish
- [ ] Meta progression

### Phase 4: Release
- [ ] Steam port
- [ ] Achievements
- [ ] Daily challenges

## 📜 License

All rights reserved.

---

*Built with The Forge framework for AI-assisted development.*
