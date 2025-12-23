import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';

export function GameOverScreen() {
  const player = useGameStore((state) => state.run?.player);
  const progression = useGameStore((state) => state.progression);
  const abandonRun = useGameStore((state) => state.abandonRun);
  const startNewRun = useGameStore((state) => state.startNewRun);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-hell-obsidian via-hell-red/30 to-hell-obsidian">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-greek text-6xl text-hell-ember mb-4">Defeat</h1>
        <p className="text-spartan-marble text-lg mb-8">
          The forge has fallen...
        </p>

        {/* Skull Icon */}
        <div className="text-8xl mb-8">💀</div>

        {/* Run Stats */}
        <div className="bg-hell-obsidian/80 rounded-lg p-6 mb-8 border border-hell-ember/30">
          <h2 className="text-spartan-bronze text-xl mb-4">Run Statistics</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Final HP</div>
              <div className="text-white">{player?.hp ?? 0}/{player?.maxHp ?? 80}</div>
            </div>
            <div>
              <div className="text-gray-500">Divine Favor</div>
              <div className="text-divine-gold">{player?.divineFavor ?? 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Cards in Deck</div>
              <div className="text-white">{player?.deck.length ?? 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Total Runs</div>
              <div className="text-white">{progression.runsCompleted}</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => startNewRun()}
            className="btn-primary px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>

          <motion.button
            onClick={abandonRun}
            className="btn-danger px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Main Menu
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
