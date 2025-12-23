import { useGameStore } from '../../engine/state/game-store';

export function ResourceBar() {
  const player = useGameStore((state) => state.run?.player);
  const map = useGameStore((state) => state.run?.map);

  if (!player) return null;

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-hell-obsidian/90 border-b border-spartan-bronze/30">
      {/* Left - HP */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">❤️</span>
          <span className="text-white font-bold">{player.hp}/{player.maxHp}</span>
        </div>
      </div>

      {/* Center - Act Progress */}
      <div className="text-spartan-marble text-sm">
        Act {map?.act || 1}
      </div>

      {/* Right - Resources */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-divine-gold text-xl">💰</span>
          <span className="text-white font-bold">{player.divineFavor}</span>
          <span className="text-spartan-bronze text-xs">Favor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400 text-xl">💎</span>
          <span className="text-white font-bold">{player.adamantShards}</span>
          <span className="text-spartan-bronze text-xs">Adamant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-spartan-bronze text-xl">🃏</span>
          <span className="text-white font-bold">{player.deck.length}</span>
          <span className="text-spartan-bronze text-xs">Cards</span>
        </div>
      </div>
    </div>
  );
}
