import React from 'react';

export const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  status,
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-2 ring-[#07090e]',
    busy: 'bg-rose-500 ring-2 ring-[#07090e]',
    away: 'bg-amber-500 ring-2 ring-[#07090e]'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover border border-white/10 shadow-md`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white border border-white/20 shadow-md`}>
          {alt.slice(0, 2).toUpperCase()}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColors[status]}`} />
      )}
    </div>
  );
};

export default Avatar;
