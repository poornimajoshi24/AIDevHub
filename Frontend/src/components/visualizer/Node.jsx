import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Server, Database, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';

export const Node = ({ node, selected, onClick }) => {
  const iconMap = {
    api: Server,
    db: Database,
    cache: Cpu,
    service: Layers,
    auth: ShieldCheck,
    worker: Zap
  };

  const Icon = iconMap[node.type] || Server;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      onClick={() => onClick?.(node)}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 glass-panel rounded-2xl p-4 border transition-all duration-300 ${
        selected
          ? 'border-purple-400 bg-purple-600/20 shadow-glow-purple ring-2 ring-purple-500/50'
          : 'border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl border ${selected ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-white/5 border-white/10 text-cyan-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-[120px]">
          <span className="text-xs font-bold text-white font-mono">{node.label}</span>
          <span className="text-[10px] text-slate-400">{node.subtitle}</span>
        </div>
        <Badge variant={node.status === 'healthy' ? 'emerald' : 'amber'} size="sm">
          {node.metrics}
        </Badge>
      </div>
    </motion.div>
  );
};

export default Node;
