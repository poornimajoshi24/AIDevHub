import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = 'purple',
  showPercentage = true,
  height = 'h-2',
  label,
  className = ''
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colors = {
    purple: 'from-purple-600 to-indigo-500 shadow-glow-purple',
    cyan: 'from-cyan-500 to-blue-500 shadow-glow-cyan',
    emerald: 'from-emerald-500 to-teal-400 shadow-glow-emerald',
    amber: 'from-amber-500 to-orange-400',
    rose: 'from-rose-600 to-red-500'
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium">
          {label && <span className="text-slate-300">{label}</span>}
          {showPercentage && <span className="text-slate-400 font-mono">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/5 rounded-full overflow-hidden border border-white/10 ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${colors[color] || colors.purple}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
