import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';

export const ChatBubble = ({ onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple hover:scale-105 transition-transform duration-300 flex items-center justify-center group ${
        active ? 'ring-4 ring-purple-500/30' : ''
      }`}
    >
      <div className="w-full h-full bg-[#07090e] rounded-[14px] flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </div>
      {/* Pulse status indicator */}
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#07090e] rounded-full" />
    </button>
  );
};

export default ChatBubble;
