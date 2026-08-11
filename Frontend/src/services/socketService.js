import { io } from 'socket.io-client';

let socket = null;

export const socketService = {
  connect: (token = '') => {
    if (socket && socket.connected) return socket;

    const socketUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;

    socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to AIDevHub Socket.IO Real-Time Engine:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket Disconnected:', reason);
    });

    return socket;
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  joinRoom: (roomId) => {
    if (socket) {
      socket.emit('join_room', roomId);
    }
  },

  sendChatMessage: (roomId, message) => {
    if (socket) {
      socket.emit('send_chat_message', { roomId, message });
    }
  },

  emitTyping: (roomId, isTyping) => {
    if (socket) {
      socket.emit('typing', { roomId, isTyping });
    }
  },

  onStreamChunk: (callback) => {
    if (socket) {
      socket.off('ai_stream_chunk');
      socket.on('ai_stream_chunk', callback);
    }
  },

  onReceiveMessage: (callback) => {
    if (socket) {
      socket.off('receive_chat_message');
      socket.on('receive_chat_message', callback);
    }
  },

  onNotification: (callback) => {
    if (socket) {
      socket.off('notification_event');
      socket.on('notification_event', callback);
    }
  },
};
