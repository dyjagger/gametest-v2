# AI Development Guide - Forge of the Fallen

> **Purpose**: Deck-building roguelike card game with Greek mythology theme  
> **Status**: In Development (Phase 1 - Foundation)

---

## Project Overview

**Forge of the Fallen** is a Slay the Spire-style deck-building roguelike where you play as Khalenos, a legendary Spartan blacksmith defending a forge outpost between Heaven and Hell. Build your deck through combat, trade cards with elite Spartans for powerful blessings, and ultimately defeat the demon lord Moloch.

### Key Features
- **Card Combat**: Energy-based card system with Attack, Defense, Forge, Hybrid, and Power cards
- **Spartan Trading**: Unique system where you trade cards to Spartan heroes for permanent blessings
- **Procedural Maps**: 4 Acts with node-based progression (combat, shops, events, rest sites)
- **Pixel Art Aesthetic**: Greek mythology meets Heaven vs Hell in 16-32px pixel art style

---

## Tech Stack

### Language & Runtime
| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Language** | TypeScript | Type safety for complex game state |
| **Runtime** | Node 18+ / Browser | Web-first, Steam port later |

### Frameworks & Libraries
| Component | Choice | Purpose |
|-----------|--------|---------|
| **UI Framework** | React 18 | Component-based UI |
| **Build Tool** | Vite | Fast dev server, optimized builds |
| **State Management** | Zustand | Simple, performant game state |
| **Styling** | TailwindCSS | Rapid UI development |
| **Animation** | Framer Motion | Smooth card/combat animations |
| **Testing** | Vitest | Fast unit/integration tests |
| **RNG** | seedrandom | Reproducible seeded runs |

### Infrastructure
| Component | Details |
|-----------|---------|
| **Deployment** | itch.io (prototype), Steam (release) |
| **CI/CD** | GitHub Actions |
| **Save System** | localStorage (web), Steam Cloud (desktop) |

---

## Directory Structure

```
forge-of-the-fallen/
├── src/
│   ├── components/          # React UI components
│   │   ├── combat/          # CombatScreen, EnemyDisplay, HandDisplay
│   │   ├── map/             # MapScreen, NodeDisplay, PathSelector
│   │   ├── cards/           # CardDisplay, CardPile, CardReward
│   │   ├── spartans/        # SpartanPortrait, TradeInterface
│   │   └── ui/              # Button, Modal, ResourceBar, HealthBar
│   ├── data/                # Game content (source of truth)
│   │   ├── cards/           # All 120+ card definitions
│   │   ├── enemies/         # All 36 enemy definitions
│   │   ├── artifacts/       # All 70+ artifact definitions
│   │   └── spartans/        # All 12 Spartan definitions
│   ├── engine/              # Core game logic (pure functions)
│   │   ├── combat/          # Turn engine, damage calc, targeting
│   │   ├── effects/         # Card effects, status effects
│   │   ├── map/             # Map generation, pathing
│   │   └── state/           # Zustand stores, actions
│   ├── hooks/               # useGameState, useCombat, useAnimation
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Helpers (shuffle, rng, formatting)
│   └── styles/              # CSS variables, design tokens
├── tests/
│   ├── unit/                # Engine function tests
│   └── integration/         # Game flow tests
├── public/
│   └── assets/              # Sprites, audio, fonts
├── docs/                    # Additional documentation
├── .windsurf/rules/         # AI behavior rules
├── AI_README.md             # This file
├── TESTING.md               # Testing methodology
├── SECURITY.md              # Security guidelines
├── CHANGELOG.md             # Version history
└── README.md                # User-facing documentation
```

---

## Architecture

### Game State Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Zustand   │────▶│   Engine    │
│ Components  │◀────│   Store     │◀────│  Functions  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
   UI Events          Game State          Pure Logic
   (click card)       (hp, deck, etc)     (calc damage)
```

### Combat Loop
```
┌──────────────────────────────────────────────────────────┐
│                     COMBAT LOOP                          │
├──────────────────────────────────────────────────────────┤
│  START TURN                                              │
│    ├─▶ Refresh energy                                    │
│    ├─▶ Draw cards (5 default)                            │
│    ├─▶ Trigger start-of-turn effects                     │
│    └─▶ Show enemy intents                                │
│                                                          │
│  PLAYER PHASE                                            │
│    ├─▶ Play cards (spend energy)                         │
│    ├─▶ Resolve card effects                              │
│    └─▶ End turn (button click)                           │
│                                                          │
│  ENEMY PHASE                                             │
│    ├─▶ Execute enemy intents                             │
│    ├─▶ Apply damage/effects                              │
│    └─▶ Update enemy intents for next turn                │
│                                                          │
│  END TURN                                                │
│    ├─▶ Discard remaining hand                            │
│    ├─▶ Decay block                                       │
│    ├─▶ Tick status effects                               │
│    └─▶ Check win/lose conditions                         │
└──────────────────────────────────────────────────────────┘
```

### Key Components

1. **GameStateStore** (`src/engine/state/game-store.ts`)
   - Central Zustand store for all game state
   - Handles player, combat, map, progression data
   - Persists to localStorage

2. **CombatEngine** (`src/engine/combat/combat-engine.ts`)
   - Pure functions for combat calculations
   - Damage, block, status effect resolution
   - Card effect processing

3. **CardEffectProcessor** (`src/engine/effects/card-effects.ts`)
   - Modular effect system
   - Each effect type is a pure function
   - Composable for complex cards

4. **MapGenerator** (`src/engine/map/map-generator.ts`)
   - Procedural node-based map creation
   - Path branching and convergence
   - Node type distribution per act

---

## Visual Design System

### Color Palette (CSS Variables)

```css
:root {
  /* Divine/Heaven */
  --color-divine-gold: #FFD700;
  --color-divine-white: #F5F5DC;
  --color-divine-blue: #87CEEB;
  
  /* Mortal/Spartan */
  --color-spartan-bronze: #CD7F32;
  --color-spartan-crimson: #8B0000;
  --color-spartan-marble: #FAF0E6;
  
  /* Hell/Infernal */
  --color-hell-red: #8B0000;
  --color-hell-obsidian: #1A1A1A;
  --color-hell-ember: #FF4500;
  
  /* Card Type Borders */
  --color-card-attack: #8B0000;
  --color-card-defense: #4682B4;
  --color-card-forge: #FF4500;
  --color-card-hybrid: #6A0DAD;
  --color-card-power: #FFD700;
  --color-card-curse: #0D0D0D;
  
  /* Rarity Glows */
  --color-rarity-common: transparent;
  --color-rarity-uncommon: #32CD32;
  --color-rarity-rare: #1E90FF;
  --color-rarity-legendary: #FFD700;
}
```

### Pixel Art Specifications
- **Base Resolution**: 16x16 to 32x32 sprites
- **Display Scale**: 2x-4x for crisp pixels
- **Card Size**: 64x96 pixels (base)
- **Enemy Sprites**: 24x24 (basic), 32x32 (elite), 64x64 (boss)
- **Spartan Portraits**: 96x96 pixels

---

## Development Workflow

### Getting Started

```bash
# Clone repository
git clone [repository-url]
cd forge-of-the-fallen

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

### Common Tasks

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Run tests | `npm test` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |

---

## Code Patterns & Conventions

### Card Definition Pattern
```typescript
export const hammerStrike: Card = {
  id: 'hammer-strike',
  name: 'Hammer Strike',
  type: CardType.Attack,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Deal 6 damage.',
  effects: [{ type: EffectType.Damage, value: 6 }],
  tags: ['Strike', 'Weapon'],
  upgraded: false,
  upgradedVersion: {
    description: 'Deal 8 damage.',
    effects: [{ type: EffectType.Damage, value: 8 }],
  },
};
```

### Enemy Pattern Definition
```typescript
export const impSwarm: Enemy = {
  id: 'imp-swarm',
  name: 'Imp Swarm',
  maxHp: 12,
  pattern: [
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Defend, value: 6 },
  ],
  loot: { divineFavor: 10 },
};
```

### Effect Resolution Pattern
```typescript
function resolveEffect(effect: Effect, state: CombatState): CombatState {
  switch (effect.type) {
    case EffectType.Damage:
      return applyDamage(state, effect.target, effect.value);
    case EffectType.Block:
      return applyBlock(state, effect.value);
    case EffectType.Draw:
      return drawCards(state, effect.value);
    // ... more effect types
  }
}
```

---

## Key Files for AI Assistance

| File | Purpose | When to Modify |
|------|---------|----------------|
| `src/types/index.ts` | All TypeScript interfaces | Adding new game concepts |
| `src/data/cards/*.ts` | Card definitions | Adding/balancing cards |
| `src/data/enemies/*.ts` | Enemy definitions | Adding/balancing enemies |
| `src/engine/combat/combat-engine.ts` | Combat logic | Fixing combat bugs |
| `src/engine/effects/card-effects.ts` | Effect processing | Adding new effect types |
| `src/engine/state/game-store.ts` | Game state | Adding new state fields |

---

## Game Constants

```typescript
// Starting values
const STARTING_HP = 80;
const STARTING_ENERGY = 3;
const STARTING_DECK_SIZE = 20;
const HAND_SIZE = 5;

// Limits
const MAX_ENERGY = 10;
const MAX_HAND_SIZE = 10;

// Combat
const BLOCK_DECAY = true; // Block resets each turn

// Rewards
const CARD_REWARD_CHOICES = 3;
const ELITE_ADAMANT_CHANCE = 0.25;
const BOSS_ADAMANT_GUARANTEED = true;
```

---

## External References

| Resource | Purpose | Link |
|----------|---------|------|
| Game Design Doc | Complete game mechanics | `../game_concept.md` |
| Slay the Spire Wiki | Reference implementation | [wiki link] |
| Pixel Art Tutorial | Art style reference | [tutorial link] |

---

## Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

---

## AI Development Rules

This project uses Windsurf-compatible AI behavior rules located at:

```
.windsurf/rules/project-rules.md
```

These rules are **automatically loaded** by Windsurf.
