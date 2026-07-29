import React, { useState } from 'react';
import { Send, Paperclip, Sparkles, Code, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';

export const ChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState('');

  const presets = [
    'Refactor DataGrid.tsx for zero re-renders',
    'How to optimize ATS score for Staff Engineer role?',
    'Explain distributed locking in Redis'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Preset Pill Triggers */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSend(p)}
            className="text-[11px] font-medium text-slate-400 hover:text-white glass-panel px-3 py-1 rounded-full whitespace-nowrap border border-white/10 hover:border-purple-500/30 transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            {p}
          </button>
        ))}
      </div>

      {/* Main Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask AI Developer Assistant to review code, craft resume bullets, or optimize architecture..."
          className="w-full glass-input rounded-2xl text-sm text-slate-100 placeholder-slate-500 pl-4 pr-24 py-3.5 focus:border-purple-500/50 shadow-glass"
          disabled={loading}
        />

        <div className="absolute right-2 flex items-center gap-1.5">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon={Send}
            loading={loading}
            disabled={!text.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
