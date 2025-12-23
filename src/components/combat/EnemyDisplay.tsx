import { motion } from 'framer-motion';
import { Enemy, IntentType } from '../../types';

interface EnemyDisplayProps {
  enemy: Enemy;
  index: number;
  isTargetable?: boolean;
  onSelect?: () => void;
}

const INTENT_ICONS: Record<IntentType, string> = {
  [IntentType.Attack]: '⚔️',
  [IntentType.Defend]: '🛡️',
  [IntentType.Buff]: '⬆️',
  [IntentType.Debuff]: '⬇️',
  [IntentType.HeavyAttack]: '💀',
  [IntentType.AttackDebuff]: '⚔️💢',
  [IntentType.AttackBuff]: '⚔️✨',
  [IntentType.Summon]: '👥',
  [IntentType.Heal]: '💚',
  [IntentType.Unknown]: '❓',
};

export function EnemyDisplay({ enemy, index, isTargetable, onSelect }: EnemyDisplayProps) {
  const hpPercent = (enemy.hp / enemy.maxHp) * 100;
  const intent = enemy.currentIntent;

  return (
    <motion.div
      className={`flex flex-col items-center ${isTargetable ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={isTargetable ? onSelect : undefined}
      whileHover={isTargetable ? { scale: 1.1 } : {}}
    >
      {/* Targeting Indicator */}
      {isTargetable && (
        <div className="mb-1 text-divine-gold text-xs animate-pulse">
          ▼ Click to target ▼
        </div>
      )}

      {/* Intent Display */}
      <div className="mb-2 px-3 py-1 bg-hell-obsidian/80 rounded-lg border border-spartan-bronze/50">
        <span className="text-2xl">{INTENT_ICONS[intent?.type || IntentType.Unknown]}</span>
        {intent?.value && (
          <span className="ml-2 text-white font-bold">
            {intent.value}
            {intent.times && intent.times > 1 && ` x${intent.times}`}
          </span>
        )}
      </div>

      {/* Enemy Sprite Placeholder */}
      <div 
        className={`w-24 h-24 bg-hell-red/30 border-2 rounded-lg flex items-center justify-center pixel-art
          ${isTargetable ? 'border-divine-gold ring-2 ring-divine-gold/50 animate-pulse' : 'border-hell-ember'}`}
        style={{ imageRendering: 'pixelated' }}
      >
        <span className="text-4xl">👹</span>
      </div>

      {/* Enemy Name */}
      <div className="mt-2 text-spartan-marble text-sm font-bold">
        {enemy.name}
      </div>

      {/* Health Bar */}
      <div className="w-28 mt-1">
        <div className="health-bar h-4">
          <motion.div
            className="health-bar-fill"
            initial={{ width: '100%' }}
            animate={{ width: `${hpPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center text-xs text-white mt-1">
          {enemy.hp}/{enemy.maxHp}
        </div>
      </div>

      {/* Block Display */}
      {enemy.block > 0 && (
        <div className="mt-1 px-2 py-0.5 bg-card-defense/80 rounded text-white text-xs">
          🛡️ {enemy.block}
        </div>
      )}

      {/* Status Effects */}
      {enemy.statusEffects.length > 0 && (
        <div className="flex gap-1 mt-1">
          {enemy.statusEffects.map((effect, i) => (
            <div
              key={i}
              className="w-6 h-6 bg-hell-obsidian/80 rounded flex items-center justify-center text-xs"
              title={`${effect.type}: ${effect.stacks}`}
            >
              {effect.stacks}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
