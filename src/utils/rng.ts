import seedrandom from 'seedrandom';

export type RNG = () => number;

export function createSeededRng(seed: string): RNG {
  return seedrandom(seed);
}

export function shuffle<T>(array: T[], rng: RNG = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomInt(min: number, max: number, rng: RNG = Math.random): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randomElement<T>(array: T[], rng: RNG = Math.random): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(rng() * array.length)];
}

export function weightedRandom<T>(items: T[], weights: number[], rng: RNG = Math.random): T | undefined {
  if (items.length === 0 || items.length !== weights.length) return undefined;
  
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = rng() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
}

export function chance(probability: number, rng: RNG = Math.random): boolean {
  return rng() < probability;
}
