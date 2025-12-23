import { motion } from 'framer-motion';

interface ForgeDisplayProps {
  hp: number;
  maxHp: number;
  block: number;
}

export function ForgeDisplay({ hp, maxHp, block }: ForgeDisplayProps) {
  const hpPercent = (hp / maxHp) * 100;
  const isLowHp = hpPercent < 30;
  const isCritical = hpPercent < 15;

  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={isCritical ? { x: [0, -2, 2, -2, 0] } : {}}
      transition={{ repeat: isCritical ? Infinity : 0, duration: 0.5 }}
    >
      {/* Forge Visual */}
      <div className="relative">
        {/* Forge Structure */}
        <div 
          className={`w-48 h-32 rounded-lg border-4 flex items-center justify-center
            ${isCritical ? 'border-hell-ember animate-pulse' : 'border-spartan-bronze'}
            bg-gradient-to-b from-hell-obsidian to-hell-red/40`}
        >
          {/* Forge Icon/Sprite Placeholder */}
          <div className="text-6xl pixel-art">🔥</div>
          
          {/* Cracks overlay for low HP */}
          {isLowHp && (
            <div className="absolute inset-0 opacity-50 pointer-events-none">
              <div className="absolute top-2 left-4 w-8 h-0.5 bg-hell-ember rotate-45" />
              <div className="absolute top-6 right-6 w-6 h-0.5 bg-hell-ember -rotate-30" />
              {isCritical && (
                <>
                  <div className="absolute bottom-4 left-8 w-10 h-0.5 bg-hell-ember rotate-12" />
                  <div className="absolute bottom-8 right-4 w-8 h-0.5 bg-hell-ember -rotate-45" />
                </>
              )}
            </div>
          )}
        </div>

        {/* Ember particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-hell-ember rounded-full"
              style={{ left: `${20 + i * 15}%`, bottom: '20%' }}
              animate={{
                y: [0, -40, -60],
                opacity: [1, 0.8, 0],
                scale: [1, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Forge Label */}
      <div className="mt-2 text-divine-gold font-greek text-lg tracking-wider">
        THE FORGE
      </div>

      {/* Health Bar */}
      <div className="w-48 mt-2">
        <div className="health-bar">
          <motion.div
            className="health-bar-fill"
            animate={{ width: `${hpPercent}%` }}
            transition={{ duration: 0.3 }}
            style={{
              background: isCritical 
                ? 'linear-gradient(to bottom, #ef4444, #7f1d1d)' 
                : isLowHp 
                  ? 'linear-gradient(to bottom, #f97316, #c2410c)'
                  : 'linear-gradient(to bottom, #ef4444, #b91c1c)',
            }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-white">❤️ {hp}/{maxHp}</span>
          {block > 0 && (
            <span className="text-card-defense">🛡️ {block}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
