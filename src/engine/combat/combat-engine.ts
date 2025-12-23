import type { Enemy } from '../../types';

export function checkCombatEnd(enemies: Enemy[], playerHp: number): 'victory' | 'defeat' | null {
  if (playerHp <= 0) return 'defeat';
  if (enemies.every(e => e.hp <= 0)) return 'victory';
  return null;
}
