import React from 'react';

export const ModernBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep dark gradient mesh */}
      <div className="absolute inset-0 bg-[#07090e]" />

      {/* Animated Glowing Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Apple & Linear style subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Radial lighting spotlight from top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-purple-500/10 via-cyan-500/5 to-transparent blur-3xl" />
    </div>
  );
};

export default ModernBackground;
