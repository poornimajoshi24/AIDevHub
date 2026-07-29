import React from 'react';

export const Edge = ({ from, to, active = false }) => {
  if (!from || !to) return null;

  // Calculate SVG line coordinates (percentage based relative to canvas)
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <linearGradient id={`edge-grad-${from.id}-${to.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Base line */}
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Active Glowing Flow Line */}
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={`url(#edge-grad-${from.id}-${to.id})`}
        strokeWidth={active ? "3" : "2"}
        strokeDasharray="8 6"
        className="animate-spin-slow"
      />
    </svg>
  );
};

export default Edge;
