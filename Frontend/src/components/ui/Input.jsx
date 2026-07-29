import React from 'react';

export const Input = ({
  label,
  icon: Icon,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full glass-input rounded-xl text-sm text-slate-100 placeholder-slate-500 px-4 py-2.5 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
    </div>
  );
};

export default Input;
