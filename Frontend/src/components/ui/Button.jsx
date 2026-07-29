import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-glow-purple hover:shadow-glow-cyan hover:opacity-95 active:scale-[0.98]',
    secondary: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 active:scale-[0.98]',
    outline: 'bg-transparent text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/60 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/5 hover:text-white',
    danger: 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg hover:opacity-90 active:scale-[0.98]'
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;
