import { CardInstance, CardType, Rarity, EffectType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Helper to create card instances with unique IDs
function createCardInstance(card: Omit<CardInstance, 'instanceId'>): CardInstance {
  return {
    ...card,
    instanceId: uuidv4(),
  };
}

// -------------------- STARTING DECK CARD DEFINITIONS --------------------

const hammerStrike: Omit<CardInstance, 'instanceId'> = {
  id: 'hammer-strike',
  name: 'Hammer Strike',
  type: CardType.Attack,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Deal 6 damage.',
  effects: [{ type: EffectType.Damage, value: 6, target: 'enemy' }],
  tags: ['Strike', 'Weapon'],
  upgraded: false,
  upgradedVersion: {
    description: 'Deal 8 damage.',
    effects: [{ type: EffectType.Damage, value: 8, target: 'enemy' }],
  },
};

const forgeSmash: Omit<CardInstance, 'instanceId'> = {
  id: 'forge-smash',
  name: 'Forge Smash',
  type: CardType.Attack,
  rarity: Rarity.Common,
  energyCost: 2,
  description: 'Deal 12 damage.',
  effects: [{ type: EffectType.Damage, value: 12, target: 'enemy' }],
  tags: ['Strike', 'Weapon'],
  upgraded: false,
  upgradedVersion: {
    description: 'Deal 16 damage.',
    effects: [{ type: EffectType.Damage, value: 16, target: 'enemy' }],
  },
};

const spartanStrike: Omit<CardInstance, 'instanceId'> = {
  id: 'spartan-strike',
  name: 'Spartan Strike',
  type: CardType.Attack,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Deal 7 damage.',
  effects: [{ type: EffectType.Damage, value: 7, target: 'enemy' }],
  tags: ['Strike', 'Spartan'],
  upgraded: false,
  upgradedVersion: {
    description: 'Deal 10 damage.',
    effects: [{ type: EffectType.Damage, value: 10, target: 'enemy' }],
  },
};

const shieldBrace: Omit<CardInstance, 'instanceId'> = {
  id: 'shield-brace',
  name: 'Shield Brace',
  type: CardType.Defense,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Gain 5 Block.',
  effects: [{ type: EffectType.Block, value: 5 }],
  tags: ['Block'],
  upgraded: false,
  upgradedVersion: {
    description: 'Gain 8 Block.',
    effects: [{ type: EffectType.Block, value: 8 }],
  },
};

const aspisGuard: Omit<CardInstance, 'instanceId'> = {
  id: 'aspis-guard',
  name: 'Aspis Guard',
  type: CardType.Defense,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Gain 6 Block.',
  effects: [{ type: EffectType.Block, value: 6 }],
  tags: ['Block', 'Spartan'],
  upgraded: false,
  upgradedVersion: {
    description: 'Gain 9 Block.',
    effects: [{ type: EffectType.Block, value: 9 }],
  },
};

const temper: Omit<CardInstance, 'instanceId'> = {
  id: 'temper',
  name: 'Temper',
  type: CardType.Forge,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Upgrade a card in hand for this combat.',
  effects: [{ type: EffectType.UpgradeCard }],
  tags: ['Forge'],
  upgraded: false,
  upgradedVersion: {
    description: 'Upgrade a card in hand for this combat.',
    effects: [{ type: EffectType.UpgradeCard }],
    energyCost: 0,
  },
};

const bellowsBlast: Omit<CardInstance, 'instanceId'> = {
  id: 'bellows-blast',
  name: 'Bellows Blast',
  type: CardType.Forge,
  rarity: Rarity.Common,
  energyCost: 0,
  description: 'Gain 1 Energy.',
  effects: [{ type: EffectType.GainEnergy, value: 1 }],
  tags: ['Forge', 'Fire'],
  upgraded: false,
  upgradedVersion: {
    description: 'Gain 2 Energy.',
    effects: [{ type: EffectType.GainEnergy, value: 2 }],
  },
};

const stokeFlames: Omit<CardInstance, 'instanceId'> = {
  id: 'stoke-flames',
  name: 'Stoke Flames',
  type: CardType.Forge,
  rarity: Rarity.Common,
  energyCost: 1,
  description: 'Draw 2 cards.',
  effects: [{ type: EffectType.Draw, value: 2 }],
  tags: ['Forge', 'Fire'],
  upgraded: false,
  upgradedVersion: {
    description: 'Draw 3 cards.',
    effects: [{ type: EffectType.Draw, value: 3 }],
  },
};

const combatForge: Omit<CardInstance, 'instanceId'> = {
  id: 'combat-forge',
  name: 'Combat Forge',
  type: CardType.Hybrid,
  rarity: Rarity.Common,
  energyCost: 2,
  description: 'Deal 8 damage. Draw 1 card.',
  effects: [
    { type: EffectType.Damage, value: 8, target: 'enemy' },
    { type: EffectType.Draw, value: 1 },
  ],
  tags: ['Strike', 'Forge'],
  upgraded: false,
  upgradedVersion: {
    description: 'Deal 11 damage. Draw 1 card.',
    effects: [
      { type: EffectType.Damage, value: 11, target: 'enemy' },
      { type: EffectType.Draw, value: 1 },
    ],
  },
};

// -------------------- CREATE STARTING DECK --------------------

export function createStartingDeck(): CardInstance[] {
  const deck: CardInstance[] = [];
  
  // 4x Hammer Strike
  for (let i = 0; i < 4; i++) {
    deck.push(createCardInstance(hammerStrike));
  }
  
  // 2x Forge Smash
  for (let i = 0; i < 2; i++) {
    deck.push(createCardInstance(forgeSmash));
  }
  
  // 1x Spartan Strike
  deck.push(createCardInstance(spartanStrike));
  
  // 4x Shield Brace
  for (let i = 0; i < 4; i++) {
    deck.push(createCardInstance(shieldBrace));
  }
  
  // 2x Aspis Guard
  for (let i = 0; i < 2; i++) {
    deck.push(createCardInstance(aspisGuard));
  }
  
  // 3x Temper
  for (let i = 0; i < 3; i++) {
    deck.push(createCardInstance(temper));
  }
  
  // 2x Bellows Blast
  for (let i = 0; i < 2; i++) {
    deck.push(createCardInstance(bellowsBlast));
  }
  
  // 1x Stoke Flames
  deck.push(createCardInstance(stokeFlames));
  
  // 1x Combat Forge
  deck.push(createCardInstance(combatForge));
  
  return deck; // Total: 20 cards
}

// Export individual cards for reference
export const startingCards = {
  hammerStrike,
  forgeSmash,
  spartanStrike,
  shieldBrace,
  aspisGuard,
  temper,
  bellowsBlast,
  stokeFlames,
  combatForge,
};
