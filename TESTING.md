# Testing Methodology - Forge of the Fallen

## Overview

This document outlines the testing strategy for Forge of the Fallen. Given the complexity of card game mechanics, thorough testing is critical to ensure balanced, bug-free gameplay.

---

## Testing Stack

- **Framework**: Vitest
- **Assertions**: Vitest built-in + custom matchers
- **Coverage**: V8 coverage provider
- **Mocking**: Vitest mocking utilities

---

## Test Categories

### 1. Unit Tests (`tests/unit/`)

Test individual functions in isolation.

**Priority Areas:**
- Combat calculations (damage, block, status effects)
- Card effect resolution
- Enemy intent generation
- RNG/seeding functions
- State mutations

**Example:**
```typescript
describe('applyDamage', () => {
  it('should reduce enemy HP by damage amount', () => {
    const enemy = { hp: 20, maxHp: 20 };
    const result = applyDamage(enemy, 6);
    expect(result.hp).toBe(14);
  });

  it('should apply Vulnerable modifier (50% more damage)', () => {
    const enemy = { hp: 20, maxHp: 20, statusEffects: [{ type: 'Vulnerable', stacks: 2 }] };
    const result = applyDamage(enemy, 10);
    expect(result.hp).toBe(5); // 10 * 1.5 = 15 damage
  });
});
```

### 2. Integration Tests (`tests/integration/`)

Test game systems working together.

**Priority Areas:**
- Full combat encounters (start to finish)
- Card play → effect resolution → state update
- Spartan trading flow
- Map progression
- Save/load cycle

**Example:**
```typescript
describe('Combat Flow', () => {
  it('should complete a full combat against Imp Swarm', () => {
    const state = initializeCombat({ enemy: 'imp-swarm' });
    
    // Play cards
    state = playCard(state, 'hammer-strike', 0);
    state = playCard(state, 'hammer-strike', 0);
    state = endTurn(state);
    
    // Enemy turn
    state = executeEnemyTurn(state);
    
    // Verify state
    expect(state.enemies[0].hp).toBe(0);
    expect(state.combatResult).toBe('victory');
  });
});
```

### 3. Card Interaction Tests

Every card should have tests for:
- Basic effect resolution
- Interaction with status effects
- Edge cases (0 energy, empty hand, etc.)
- Upgraded version differences

**Example:**
```typescript
describe('Molten Strike', () => {
  it('should deal 13 damage and apply 2 Burn', () => {
    const state = playCard(initialState, 'molten-strike', 0);
    expect(state.enemies[0].hp).toBe(initialHp - 13);
    expect(getStatusStacks(state.enemies[0], 'Burn')).toBe(2);
  });

  it('upgraded should deal 17 damage and apply 3 Burn', () => {
    const state = playCard(initialState, 'molten-strike+', 0);
    expect(state.enemies[0].hp).toBe(initialHp - 17);
    expect(getStatusStacks(state.enemies[0], 'Burn')).toBe(3);
  });
});
```

### 4. Balance Tests

Automated checks for game balance:

```typescript
describe('Balance Checks', () => {
  it('all cards should have valid energy costs (0-4)', () => {
    ALL_CARDS.forEach(card => {
      expect(card.energyCost).toBeGreaterThanOrEqual(0);
      expect(card.energyCost).toBeLessThanOrEqual(4);
    });
  });

  it('legendary cards should be limited to 1 per deck', () => {
    const deck = createDeckWithMultipleLegendaries();
    expect(validateDeck(deck).errors).toContain('duplicate-legendary');
  });

  it('starting deck should be exactly 20 cards', () => {
    expect(STARTING_DECK.length).toBe(20);
  });
});
```

---

## Test Coverage Goals

| Area | Target Coverage |
|------|-----------------|
| Engine functions | 90%+ |
| Card effects | 100% |
| State management | 85%+ |
| UI components | 70%+ |
| Utilities | 90%+ |

---

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test combat-engine

# Run in watch mode
npm run test:watch
```

---

## Test File Naming

- Unit tests: `[module].test.ts`
- Integration tests: `[feature].integration.test.ts`
- Component tests: `[Component].test.tsx`

---

## Mocking Guidelines

### RNG Mocking
Always mock RNG for deterministic tests:

```typescript
import { vi } from 'vitest';
import * as rng from '../src/utils/rng';

beforeEach(() => {
  vi.spyOn(rng, 'random').mockReturnValue(0.5);
});
```

### State Mocking
Use factory functions for test state:

```typescript
function createTestCombatState(overrides = {}) {
  return {
    player: { hp: 80, maxHp: 80, energy: 3, block: 0 },
    enemies: [createTestEnemy()],
    hand: [],
    drawPile: [...STARTING_DECK],
    discardPile: [],
    turn: 1,
    ...overrides,
  };
}
```

---

## Regression Testing

When fixing bugs:
1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify the test passes
4. Keep the test to prevent regression

---

## Performance Testing

For critical paths, add performance benchmarks:

```typescript
describe('Performance', () => {
  it('should resolve 100 card plays in under 100ms', () => {
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      playCard(state, 'hammer-strike', 0);
    }
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

---

## Continuous Integration

Tests run automatically on:
- Every push to main
- Every pull request
- Nightly full test suite

Failed tests block merging.
