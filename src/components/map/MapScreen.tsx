import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';
import { NodeType, MapNode } from '../../types';
import { ResourceBar } from '../ui/ResourceBar';

const NODE_ICONS: Record<NodeType, string> = {
  [NodeType.Combat]: '⚔️',
  [NodeType.EliteCombat]: '💀',
  [NodeType.Boss]: '🔥',
  [NodeType.Rest]: '🛡️',
  [NodeType.Shop]: '💰',
  [NodeType.Event]: '❓',
  [NodeType.ForgeUpgrade]: '🔨',
  [NodeType.Shrine]: '🏛️',
};

const NODE_COLORS: Record<NodeType, string> = {
  [NodeType.Combat]: 'bg-card-attack/80 border-card-attack',
  [NodeType.EliteCombat]: 'bg-purple-900/80 border-purple-500',
  [NodeType.Boss]: 'bg-hell-ember/80 border-hell-ember',
  [NodeType.Rest]: 'bg-green-900/80 border-green-500',
  [NodeType.Shop]: 'bg-divine-gold/30 border-divine-gold',
  [NodeType.Event]: 'bg-blue-900/80 border-blue-500',
  [NodeType.ForgeUpgrade]: 'bg-orange-900/80 border-orange-500',
  [NodeType.Shrine]: 'bg-divine-gold/50 border-divine-gold',
};

export function MapScreen() {
  const map = useGameStore((state) => state.run?.map);
  const selectNode = useGameStore((state) => state.selectNode);
  const abandonRun = useGameStore((state) => state.abandonRun);

  if (!map) {
    return <div className="h-full flex items-center justify-center text-white">Loading map...</div>;
  }

  // Debug: count available nodes
  const availableNodes = map.nodes.filter(n => n.available && !n.visited);
  const visitedNodes = map.nodes.filter(n => n.visited);

  // Group nodes by row
  const nodesByRow: Record<number, MapNode[]> = {};
  map.nodes.forEach((node) => {
    if (!nodesByRow[node.row]) {
      nodesByRow[node.row] = [];
    }
    nodesByRow[node.row].push(node);
  });

  const rows = Object.keys(nodesByRow)
    .map(Number)
    .sort((a, b) => b - a); // Reverse order so boss is at top

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-hell-red/10 to-hell-obsidian">
      {/* Resource Bar */}
      <ResourceBar />

      {/* Act Title */}
      <div className="text-center py-4">
        <h2 className="font-greek text-2xl text-divine-gold">
          Act {map.act}: {getActName(map.act)}
        </h2>
      </div>

      {/* Map Container */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="flex flex-col items-center gap-8">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center gap-12">
              {nodesByRow[row].map((node) => (
                <MapNodeDisplay
                  key={node.id}
                  node={node}
                  onClick={() => node.available && !node.visited && selectNode(node.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Debug Info & Controls */}
      <div className="flex justify-between items-center px-4 py-2 bg-hell-obsidian/90 border-t border-spartan-bronze/30">
        <div className="text-xs text-spartan-bronze">
          Available: {availableNodes.length} | Visited: {visitedNodes.length} | Total: {map.nodes.length}
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('forge-of-the-fallen-save');
            abandonRun();
          }}
          className="px-3 py-1 text-xs bg-hell-red/50 text-white rounded hover:bg-hell-red"
        >
          Reset & Return to Menu
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 py-2 bg-hell-obsidian/80 border-t border-spartan-bronze/30">
        {Object.entries(NODE_ICONS).map(([type, icon]) => (
          <div key={type} className="flex items-center gap-1 text-xs text-spartan-marble">
            <span>{icon}</span>
            <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MapNodeDisplayProps {
  node: MapNode;
  onClick: () => void;
}

function MapNodeDisplay({ node, onClick }: MapNodeDisplayProps) {
  const isAvailable = node.available && !node.visited;
  const isVisited = node.visited;

  return (
    <motion.button
      onClick={onClick}
      disabled={!isAvailable}
      className={`
        relative w-16 h-16 rounded-lg border-2 flex items-center justify-center
        ${NODE_COLORS[node.type]}
        ${isAvailable ? 'cursor-pointer ring-2 ring-divine-gold ring-opacity-75 animate-pulse' : ''}
        ${isVisited ? 'opacity-60 ring-2 ring-green-500' : ''}
        ${!isAvailable && !isVisited ? 'opacity-20 cursor-not-allowed' : ''}
        transition-all duration-200
      `}
      whileHover={isAvailable ? { scale: 1.15, boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' } : {}}
      whileTap={isAvailable ? { scale: 0.95 } : {}}
    >
      <span className="text-2xl">{NODE_ICONS[node.type]}</span>
      {isVisited && <span className="absolute -top-1 -right-1 text-xs">✓</span>}
    </motion.button>
  );
}

function getActName(act: number): string {
  const names: Record<number, string> = {
    1: 'The Asphodel Approach',
    2: 'The Burning Shore',
    3: 'The Frozen Crossing',
    4: 'Siege of Elysium Gates',
  };
  return names[act] || 'Unknown';
}
