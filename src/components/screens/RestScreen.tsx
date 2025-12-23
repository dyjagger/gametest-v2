import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';
import { GAME_CONSTANTS, GamePhase } from '../../types';

export function RestScreen() {
  const player = useGameStore((state) => state.run?.player);
  const healPlayer = useGameStore((state) => state.healPlayer);
  const setGamePhase = useGameStore((state) => state.setGamePhase);

  if (!player) return null;

  const healAmount = Math.floor(player.maxHp * GAME_CONSTANTS.HEAL_PERCENT_AT_REST);
  const canHeal = player.hp < player.maxHp;

  const handleRest = () => {
    if (canHeal) {
      healPlayer(healAmount);
    }
    setGamePhase(GamePhase.Map);
  };

  const handleSkip = () => {
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-hell-obsidian via-green-900/20 to-hell-obsidian">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-greek text-4xl text-divine-gold mb-4">Rest Site</h1>
        <p className="text-spartan-marble mb-8">
          A moment of respite in the darkness...
        </p>

        {/* Campfire visual */}
        <div className="text-8xl mb-8">🔥</div>

        {/* Current HP */}
        <div className="mb-8 text-lg">
          <span className="text-spartan-bronze">Current HP: </span>
          <span className="text-white">{player.hp}/{player.maxHp}</span>
        </div>

        {/* Options */}
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={handleRest}
            disabled={!canHeal}
            className={`btn-primary px-8 py-4 ${!canHeal ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={canHeal ? { scale: 1.05 } : {}}
            whileTap={canHeal ? { scale: 0.95 } : {}}
          >
            <div className="text-lg">Rest</div>
            <div className="text-sm text-spartan-bronze">
              Heal {healAmount} HP ({Math.round(GAME_CONSTANTS.HEAL_PERCENT_AT_REST * 100)}%)
            </div>
          </motion.button>

          <motion.button
            onClick={handleSkip}
            className="btn-danger px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-lg">Skip</div>
            <div className="text-sm opacity-70">Continue without resting</div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
