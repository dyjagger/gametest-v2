import type { EnemyDefinition, Enemy } from '../../types';
import { ACT1_BASIC_ENEMIES, ACT1_ELITE_ENEMIES, ACT1_BOSS_ENEMIES } from './act1-enemies';
import { v4 as uuidv4 } from 'uuid';

export function getRandomEnemies(act: number, count: number = 1, isElite: boolean = false): EnemyDefinition[] {
  let pool: EnemyDefinition[];
  
  switch (act) {
    case 1:
    default:
      pool = isElite ? ACT1_ELITE_ENEMIES : ACT1_BASIC_ENEMIES;
      break;
  }
  
  const enemies: EnemyDefinition[] = [];
  for (let i = 0; i < count; i++) {
    const enemy = pool[Math.floor(Math.random() * pool.length)];
    enemies.push(enemy);
  }
  
  return enemies;
}

export function getBossEnemy(act: number): EnemyDefinition {
  switch (act) {
    case 1:
    default:
      return ACT1_BOSS_ENEMIES[0];
  }
}

export function createEnemyInstance(definition: EnemyDefinition): Enemy {
  return {
    ...definition,
    instanceId: uuidv4(),
    hp: definition.maxHp,
    block: 0,
    statusEffects: [],
    currentIntentIndex: 0,
    currentIntent: definition.pattern[0],
  };
}

export function createCombatEnemies(act: number, isElite: boolean = false, isBoss: boolean = false): Enemy[] {
  if (isBoss) {
    return [createEnemyInstance(getBossEnemy(act))];
  }
  
  if (isElite) {
    return [createEnemyInstance(getRandomEnemies(act, 1, true)[0])];
  }
  
  // Regular combat: 1-3 enemies
  const count = Math.floor(Math.random() * 2) + 1; // 1-2 enemies
  return getRandomEnemies(act, count, false).map(createEnemyInstance);
}

export * from './act1-enemies';
