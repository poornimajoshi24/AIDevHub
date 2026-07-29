import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Sparkles, Copy, Check, Terminal } from 'lucide-react';

export const ChatMessage = ({ message }) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === 'user';

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3.5 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl p-4 flex flex-col gap-2.5 text-sm leading-relaxed border ${
          isUser
            ? 'bg-purple-600/20 border-purple-500/40 text-slate-100 rounded-tr-none'
            : 'glass-panel border-white/10 text-slate-200 rounded-tl-none'
        }`}
      >
        <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <span>{isUser ? 'You' : 'AIDevHub Mentor'}</span>
          <span>{message.time || 'Just now'}</span>
        </div>

        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Code Snippet Box */}
        {message.codeSnippet && (
          <div className="rounded-xl bg-[#05070a] border border-white/10 overflow-hidden mt-1 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> {message.codeLang || 'TypeScript'}
              </span>
              <button
                onClick={() => handleCopyCode(message.codeSnippet)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3.5 text-cyan-200 overflow-x-auto">
              <code>{message.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
          alt="You"
          size="sm"
          className="shrink-0 mt-0.5"
        />
      )}
    </div>
  );
};

export default ChatMessage;
