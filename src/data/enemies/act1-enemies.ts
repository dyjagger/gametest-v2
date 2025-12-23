import { EnemyDefinition, IntentType, StatusEffectType, EffectType } from '../../types';

// Act 1 Basic Enemies
export const impSwarm: EnemyDefinition = {
  id: 'imp-swarm',
  name: 'Imp Swarm',
  maxHp: 12,
  act: 1,
  pattern: [
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Defend, value: 6 },
  ],
  loot: { divineFavor: 10 },
};

export const lostSoul: EnemyDefinition = {
  id: 'lost-soul',
  name: 'Lost Soul',
  maxHp: 18,
  act: 1,
  pattern: [
    { type: IntentType.Attack, value: 6 },
    { type: IntentType.Debuff, statusEffect: StatusEffectType.Weak, statusDuration: 2 },
    { type: IntentType.Attack, value: 8 },
  ],
  loot: { divineFavor: 12 },
};

export const hellfireAcolyte: EnemyDefinition = {
  id: 'hellfire-acolyte',
  name: 'Hellfire Acolyte',
  maxHp: 22,
  act: 1,
  pattern: [
    { type: IntentType.Buff, statusEffect: StatusEffectType.Strength, statusDuration: 1 },
    { type: IntentType.Attack, value: 10 },
    { type: IntentType.Attack, value: 10 },
  ],
  loot: { divineFavor: 15 },
};

export const corruptedHoplite: EnemyDefinition = {
  id: 'corrupted-hoplite',
  name: 'Corrupted Hoplite',
  maxHp: 28,
  act: 1,
  pattern: [
    { type: IntentType.Defend, value: 8 },
    { type: IntentType.Attack, value: 12 },
    { type: IntentType.AttackDebuff, value: 8, statusEffect: StatusEffectType.Vulnerable, statusDuration: 2 },
  ],
  loot: { divineFavor: 18 },
};

// Act 1 Elite
export const infernoKnight: EnemyDefinition = {
  id: 'inferno-knight',
  name: 'Inferno Knight',
  maxHp: 55,
  act: 1,
  isElite: true,
  pattern: [
    { type: IntentType.HeavyAttack, value: 18 },
    { type: IntentType.Defend, value: 12 },
    { type: IntentType.AttackBuff, value: 12, statusEffect: StatusEffectType.Strength, statusDuration: 1 },
    { type: IntentType.HeavyAttack, value: 22 },
  ],
  loot: { divineFavor: 30, adamantShardChance: 0.25, cardReward: true },
};

// Act 1 Boss
export const cerberusPup: EnemyDefinition = {
  id: 'cerberus-pup',
  name: 'Cerberus Pup',
  maxHp: 120,
  act: 1,
  isBoss: true,
  pattern: [
    { type: IntentType.Attack, value: 8, times: 3 },
    { type: IntentType.HeavyAttack, value: 25 },
    { type: IntentType.Buff, statusEffect: StatusEffectType.Strength, statusDuration: 2 },
    { type: IntentType.Attack, value: 12, times: 2 },
  ],
  abilities: [
    {
      id: 'triple-threat',
      name: 'Triple Threat',
      description: 'Has three heads that can attack independently',
      trigger: 'passive',
      effect: { type: EffectType.Damage, value: 0 },
    },
  ],
  loot: { divineFavor: 100, adamantShardChance: 1.0, cardReward: true, artifactChance: 0.5 },
};

// Helper to get random enemies for combat
export const ACT1_BASIC_ENEMIES = [impSwarm, lostSoul, hellfireAcolyte, corruptedHoplite];
export const ACT1_ELITE_ENEMIES = [infernoKnight];
export const ACT1_BOSS_ENEMIES = [cerberusPup];
