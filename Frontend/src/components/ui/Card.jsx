import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  glowColor = 'purple',
  onClick,
  ...props
}) => {
  const glowStyles = glow ? `shadow-glow-${glowColor}` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${
        hoverEffect ? 'glass-panel-hover cursor-pointer' : ''
      } ${glowStyles} ${className}`}
      {...props}
    >
      {/* Top subtle light reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default Card;
