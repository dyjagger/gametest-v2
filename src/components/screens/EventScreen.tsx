import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';
import { GamePhase } from '../../types';

export function EventScreen() {
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  const healPlayer = useGameStore((state) => state.healPlayer);
  const addDivineFavor = useGameStore((state) => state.addDivineFavor);

  const handleChoice1 = () => {
    // Placeholder: gain some gold
    addDivineFavor(25);
    setGamePhase(GamePhase.Map);
  };

  const handleChoice2 = () => {
    // Placeholder: heal a bit
    healPlayer(10);
    setGamePhase(GamePhase.Map);
  };

  const handleSkip = () => {
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-hell-obsidian via-blue-900/20 to-hell-obsidian">
      <motion.div
        className="max-w-2xl text-center px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-greek text-4xl text-divine-gold mb-4">Mysterious Encounter</h1>
        
        {/* Event Image */}
        <div className="text-8xl mb-6">❓</div>

        {/* Event Description */}
        <div className="bg-hell-obsidian/80 rounded-lg p-6 mb-8 border border-spartan-bronze/30">
          <p className="text-spartan-marble text-lg leading-relaxed">
            You come across an ancient shrine, half-buried in ash. 
            Strange whispers emanate from within, promising power to those who dare approach...
          </p>
        </div>

        {/* Choices */}
        <div className="flex flex-col gap-4">
          <motion.button
            onClick={handleChoice1}
            className="w-full bg-divine-gold/20 border-2 border-divine-gold/50 rounded-lg p-4 text-left hover:bg-divine-gold/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-divine-gold font-bold">[Approach the shrine]</div>
            <div className="text-spartan-marble text-sm mt-1">
              Gain 25 Divine Favor
            </div>
          </motion.button>

          <motion.button
            onClick={handleChoice2}
            className="w-full bg-green-900/20 border-2 border-green-500/50 rounded-lg p-4 text-left hover:bg-green-900/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-green-400 font-bold">[Pray for healing]</div>
            <div className="text-spartan-marble text-sm mt-1">
              Heal 10 HP
            </div>
          </motion.button>

          <motion.button
            onClick={handleSkip}
            className="w-full bg-gray-800/50 border-2 border-gray-600/50 rounded-lg p-4 text-left hover:bg-gray-800/70 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-gray-400 font-bold">[Leave]</div>
            <div className="text-gray-500 text-sm mt-1">
              Continue on your path
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
