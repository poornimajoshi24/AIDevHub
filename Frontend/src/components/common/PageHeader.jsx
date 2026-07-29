import React from 'react';
import { motion } from 'framer-motion';

export const PageHeader = ({ title, subtitle, badge, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10"
    >
      <div>
        {badge && <div className="mb-2">{badge}</div>}
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-400 mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </motion.div>
  );
};

export default PageHeader;
