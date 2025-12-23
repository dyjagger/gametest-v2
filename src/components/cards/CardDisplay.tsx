import { motion } from 'framer-motion';
import { CardInstance, CardType, Rarity } from '../../types';

interface CardDisplayProps {
  card: CardInstance;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  selected?: boolean;
}

const CARD_TYPE_COLORS: Record<CardType, string> = {
  [CardType.Attack]: 'border-card-attack bg-gradient-to-b from-red-900/80 to-red-950/90',
  [CardType.Defense]: 'border-card-defense bg-gradient-to-b from-blue-900/80 to-blue-950/90',
  [CardType.Forge]: 'border-card-forge bg-gradient-to-b from-orange-900/80 to-orange-950/90',
  [CardType.Hybrid]: 'border-card-hybrid bg-gradient-to-b from-purple-900/80 to-purple-950/90',
  [CardType.Power]: 'border-card-power bg-gradient-to-b from-yellow-900/80 to-yellow-950/90',
  [CardType.Curse]: 'border-card-curse bg-gradient-to-b from-gray-900/80 to-black/90',
};

const CARD_TYPE_ICONS: Record<CardType, string> = {
  [CardType.Attack]: '⚔️',
  [CardType.Defense]: '🛡️',
  [CardType.Forge]: '🔥',
  [CardType.Hybrid]: '⚡',
  [CardType.Power]: '✨',
  [CardType.Curse]: '💀',
};

const RARITY_CLASSES: Record<Rarity, string> = {
  [Rarity.Common]: '',
  [Rarity.Uncommon]: 'rarity-uncommon',
  [Rarity.Rare]: 'rarity-rare',
  [Rarity.Legendary]: 'rarity-legendary',
};

export function CardDisplay({ card, onClick, disabled, small, selected }: CardDisplayProps) {
  const sizeClasses = small 
    ? 'w-16 h-24 text-xs' 
    : 'w-28 h-40';

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`
        card ${CARD_TYPE_COLORS[card.type]} ${RARITY_CLASSES[card.rarity]}
        ${sizeClasses} border-2 flex flex-col
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${card.upgraded ? 'ring-2 ring-divine-gold/50' : ''}
        ${selected ? 'ring-4 ring-divine-gold scale-110 -translate-y-4 z-10' : ''}
      `}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.1, y: -10 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {/* Energy Cost */}
      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-hell-obsidian border-2 border-spartan-bronze flex items-center justify-center pointer-events-none">
        <span className="text-divine-gold font-bold text-sm">{card.energyCost}</span>
      </div>

      {/* Card Type Icon */}
      <div className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-sm pointer-events-none">
        {CARD_TYPE_ICONS[card.type]}
      </div>

      {/* Card Art Placeholder */}
      <div className="flex-1 flex items-center justify-center p-2 pointer-events-none">
        <div className="w-full h-full bg-black/30 rounded flex items-center justify-center">
          <span className="text-2xl">{CARD_TYPE_ICONS[card.type]}</span>
        </div>
      </div>

      {/* Card Name */}
      <div className="px-1 py-0.5 bg-black/50 text-center pointer-events-none">
        <span className={`text-spartan-marble font-bold ${small ? 'text-[8px]' : 'text-xs'} leading-tight`}>
          {card.name}
        </span>
      </div>

      {/* Card Description */}
      {!small && (
        <div className="px-2 py-1 text-center flex-shrink-0 pointer-events-none">
          <span className="text-white text-[10px] leading-tight">
            {card.description}
          </span>
        </div>
      )}

      {/* Tags */}
      {!small && card.tags.length > 0 && (
        <div className="px-1 pb-1 flex flex-wrap justify-center gap-0.5 pointer-events-none">
          {card.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[8px] text-spartan-bronze/70">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Upgraded Indicator */}
      {card.upgraded && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-divine-gold/50 pointer-events-none" />
      )}
    </motion.div>
  );
}
