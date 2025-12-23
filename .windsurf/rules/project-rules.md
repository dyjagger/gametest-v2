# Project Rules for AI Development - Forge of the Fallen

> **Location**: `.windsurf/rules/project-rules.md`  
> **Purpose**: These rules are automatically loaded by Windsurf and guide AI behavior during development.
> **Maintainers**: Keep this file updated as the project evolves.

## About This File

This file is **automatically loaded** by Windsurf IDE when working in this repository. The AI assistant will follow these rules without you needing to reference them explicitly.

---

## Project Context

**Forge of the Fallen** is a deck-building roguelike card game featuring:
- Greek mythology theme with Spartan warriors
- Heaven vs Hell pixel art aesthetic
- Combat system with cards, energy, and status effects
- Spartan trading system for card-to-blessing exchanges
- 4 Acts with procedural map generation

---

## Key Documents

Before making changes, read and follow these documents:

- **AI_README.md** - Project architecture, patterns, visual design system
- **TESTING.md** - Testing methodology and requirements
- **SECURITY.md** - Security guidelines and best practices
- **game_concept.md** - Complete game design document (source of truth for game mechanics)

---

## Development Guidelines

### Code Architecture

1. **State Management**: Use Zustand for game state
2. **Components**: React functional components with TypeScript
3. **Styling**: TailwindCSS with CSS variables for the color palette
4. **Data**: Game content stored in TypeScript files in `src/data/`
5. **Engine**: Core game logic in `src/engine/` (pure functions where possible)

### Game Data Patterns

```typescript
// Cards follow this structure
interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  energyCost: number;
  description: string;
  effects: Effect[];
  tags: string[];
  upgraded: boolean;
}

// Enemies follow this structure
interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  pattern: IntentPattern[];
  abilities: Ability[];
  loot: LootTable;
}
```

### Visual Design Rules

1. **Color Palette**: Use CSS variables defined in `src/styles/colors.css`
   - Divine/Heaven: Gold `#FFD700`, White `#F5F5DC`, Sky Blue `#87CEEB`
   - Mortal/Spartan: Bronze `#CD7F32`, Crimson `#8B0000`, Marble `#FAF0E6`
   - Hell/Infernal: Blood Red `#8B0000`, Obsidian `#1A1A1A`, Ember `#FF4500`

2. **Card Borders**: Color-coded by type
   - Attack: Crimson Red
   - Defense: Steel Blue
   - Forge: Ember Orange
   - Hybrid: Royal Purple
   - Power: Divine Gold

3. **Pixel Art**: 16x16 to 32x32 base sprites, scaled up for display

### Naming Conventions

- **Files**: kebab-case (`combat-engine.ts`, `card-display.tsx`)
- **Components**: PascalCase (`CardDisplay`, `CombatScreen`)
- **Functions**: camelCase (`playCard`, `calculateDamage`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_HAND_SIZE`, `STARTING_HP`)
- **Types/Interfaces**: PascalCase (`GameState`, `CardEffect`)

---

## File Organization

```
src/
├── components/          # React UI components
│   ├── combat/          # Combat screen components
│   ├── map/             # Map screen components
│   ├── cards/           # Card display components
│   ├── spartans/        # Spartan trading UI
│   └── ui/              # Shared UI components
├── data/                # Game content (cards, enemies, etc.)
│   ├── cards/           # Card definitions by type
│   ├── enemies/         # Enemy definitions by act
│   ├── artifacts/       # Artifact definitions
│   └── spartans/        # Spartan definitions
├── engine/              # Core game logic
│   ├── combat/          # Combat system
│   ├── effects/         # Card/status effects
│   ├── map/             # Map generation
│   └── state/           # State management
├── hooks/               # Custom React hooks
├── types/               # TypeScript interfaces
├── utils/               # Helper functions
└── styles/              # CSS and design tokens
```

---

## Testing Expectations

- **Unit tests** for all engine functions (combat calculations, effect resolution)
- **Integration tests** for game flow (combat → rewards → map)
- **Test card interactions** thoroughly (edge cases, status effects)
- Use Vitest for testing

---

## Security Requirements

- **No hardcoded secrets** - use environment variables
- **Validate all save data** - prevent save file manipulation
- **Seed RNG properly** - for reproducible runs

---

## When to Ask vs Act

### Act (don't ask)
- Following established patterns in the codebase
- Implementing cards/enemies from game_concept.md
- Adding tests for new functionality
- Fixing bugs in game logic

### Ask first
- Changing core game mechanics
- Modifying the visual design system
- Adding new dependencies
- Changing state management approach
