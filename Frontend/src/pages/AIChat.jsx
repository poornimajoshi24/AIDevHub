import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkles, Trash2, Bot, Cpu } from 'lucide-react';

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      role: 'assistant',
      content: "Hello Alex! I am your AIDevHub AI Mentor. I can help you optimize your resume ATS score, review GitHub repository code quality, or architect high-scale backend microservices. What would you like to explore?",
      time: '10:00 AM'
    },
    {
      id: 'm2',
      role: 'user',
      content: "How should I structure my DataGrid component in React to prevent unnecessary re-renders?",
      time: '10:02 AM'
    },
    {
      id: 'm3',
      role: 'assistant',
      content: "To achieve zero unnecessary re-renders in a React DataGrid:\n\n1. Wrap cell sub-renderers in `React.memo` with custom prop comparison.\n2. Memoize column configurations & callback handlers using `useMemo` & `useCallback`.\n3. Avoid passing inline object literals to cell formatters.",
      codeLang: 'TypeScript',
      codeSnippet: `import React, { memo, useMemo } from 'react';

const DataGridCell = memo(({ value, formatter }) => {
  return <div className="p-2 border-b border-white/10">{formatter ? formatter(value) : value}</div>;
});

export const OptimizedGrid = ({ data }) => {
  const currencyFormatter = useMemo(() => (val) => '$' + val.toFixed(2), []);

  return (
    <div className="grid grid-cols-4">
      {data.map((row) => (
        <DataGridCell key={row.id} value={row.price} formatter={currencyFormatter} />
      ))}
    </div>
  );
};`,
      time: '10:02 AM'
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (userText) => {
    const userMsg = {
      id: `m_${Date.now()}`,
      role: 'user',
      content: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Simulate AI streaming response
    setTimeout(() => {
      const assistantMsg = {
        id: `m_${Date.now() + 1}`,
        role: 'assistant',
        content: `Analyzing your prompt: "${userText}". Here is the recommended architecture pattern:\n\nEnsure clear separation of concerns, leverage caching layers (Redis / Memory LRU), and encapsulate side-effects in custom hooks.`,
        codeLang: 'TypeScript',
        codeSnippet: `// Example optimized pattern
const useFetchAuditedMetrics = (repoId: string) => {
  const cacheKey = \`repo:\${repoId}\`;
  return useQuery([cacheKey], () => fetchRepoMetrics(repoId), {
    staleTime: 1000 * 60 * 5, // 5 minute cache
  });
};`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'm_reset',
        role: 'assistant',
        content: "Chat session cleared. How can I assist you with your code or resume today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)]">
      <PageHeader
        badge={<Badge variant="purple" size="sm">Gemini 3.6 Pro Model</Badge>}
        title="AI Developer Assistant & Career Mentor"
        subtitle="Ask questions about code refactoring, system architecture, or resume ATS optimization."
        action={
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 glass-panel px-3 py-1.5 rounded-xl transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Chat
          </button>
        }
      />

      {/* Main Chat Box */}
      <Card hoverEffect={false} className="flex-1 flex flex-col justify-between p-6 relative overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 mb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-xs text-purple-300 animate-pulse font-mono p-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> AIDevHub Mentor is formulating recommendations...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-white/10">
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
