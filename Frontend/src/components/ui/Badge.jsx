import React from 'react';

export const Badge = ({
  children,
  variant = 'purple',
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const variants = {
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    gray: 'bg-white/5 text-slate-300 border-white/10'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border backdrop-blur-md ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
