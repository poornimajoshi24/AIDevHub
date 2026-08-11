import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkles, Trash2, Wifi } from 'lucide-react';
import { socketService } from '../services/socketService';

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      role: 'assistant',
      content: "Hello Alex! I am your AIDevHub AI Mentor. Connected to live WebSockets. I can help you optimize your resume ATS score, review GitHub code quality, or architect backend microservices. What would you like to explore?",
      time: '10:00 AM'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSockets
    const socket = socketService.connect();
    setIsSocketConnected(true);
    socketService.joinRoom('global_ai_chat');

    // Subscribe to AI streaming chunks
    socketService.onStreamChunk((data) => {
      const { chunk, fullText, isComplete } = data;

      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isStreaming) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...lastMsg,
            content: fullText,
            isStreaming: !isComplete,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: `ai_${Date.now()}`,
              role: 'assistant',
              content: fullText,
              isStreaming: !isComplete,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ];
        }
      });

      if (isComplete) {
        setLoading(false);
      }
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleSend = async (userText) => {
    const userMsg = {
      id: `m_${Date.now()}`,
      role: 'user',
      content: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Emit event via Socket.IO WebSocket
    socketService.sendChatMessage('global_ai_chat', userText);
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
        badge={
          <Badge variant="purple" size="sm" className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" /> Live WebSockets Stream
          </Badge>
        }
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
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> Live WebSockets AI Mentor is formulating recommendations...
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
