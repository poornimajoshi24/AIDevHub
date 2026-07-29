import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({ trigger, items = [], align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger || (
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium glass-panel rounded-xl hover:bg-white/10 transition-colors">
            Options <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-40 mt-2 w-48 glass-panel rounded-xl shadow-2xl border border-white/10 p-1.5 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {items.map((item, idx) => {
              if (item.divider) {
                return <div key={idx} className="my-1 border-t border-white/10" />;
              }
              const ItemIcon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    item.danger
                      ? 'text-rose-400 hover:bg-rose-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {ItemIcon && <ItemIcon className="w-4 h-4 shrink-0" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
