import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';
import { GamePhase } from '../../types';

export function RewardScreen() {
  const player = useGameStore((state) => state.run?.player);
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  const addDivineFavor = useGameStore((state) => state.addDivineFavor);

  if (!player) return null;

  const handleCollect = () => {
    // Give some rewards
    addDivineFavor(20);
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-hell-obsidian via-divine-gold/20 to-hell-obsidian">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="font-greek text-5xl text-divine-gold mb-4">Victory!</h1>
        <p className="text-spartan-marble text-lg mb-8">
          You have defeated your enemies
        </p>

        {/* Victory Icon */}
        <div className="text-8xl mb-8">⚔️</div>

        {/* Rewards */}
        <div className="bg-hell-obsidian/80 rounded-lg p-6 mb-8 border border-divine-gold/30">
          <h2 className="text-divine-gold text-xl mb-4">Rewards</h2>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl">💰</div>
              <div className="text-white">+20</div>
              <div className="text-spartan-bronze text-sm">Divine Favor</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Card rewards coming soon!
          </p>
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={handleCollect}
          className="btn-primary px-12 py-4 text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
