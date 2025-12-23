import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';
import { GamePhase } from '../../types';

export function ShopScreen() {
  const player = useGameStore((state) => state.run?.player);
  const setGamePhase = useGameStore((state) => state.setGamePhase);

  if (!player) return null;

  const handleLeave = () => {
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-divine-gold/10 to-hell-obsidian">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="font-greek text-4xl text-divine-gold">Merchant's Haven</h1>
        <p className="text-spartan-marble mt-2">Trade your Divine Favor for powerful items</p>
      </div>

      {/* Resources */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <span className="text-divine-gold text-2xl">💰</span>
          <span className="text-white text-xl ml-2">{player.divineFavor}</span>
          <span className="text-spartan-bronze text-sm ml-1">Divine Favor</span>
        </div>
      </div>

      {/* Shop Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <p className="text-spartan-bronze text-lg mb-4">Shop coming soon!</p>
          <p className="text-gray-500 text-sm">
            Cards, artifacts, and card removal will be available here.
          </p>
        </div>
      </div>

      {/* Leave Button */}
      <div className="flex justify-center py-6">
        <motion.button
          onClick={handleLeave}
          className="btn-primary px-12 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Leave Shop
        </motion.button>
      </div>
    </div>
  );
}
