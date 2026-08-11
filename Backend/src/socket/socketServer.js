import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger.js';
import { User } from '../models/User.model.js';

let io = null;

/**
 * Parses cookies from HTTP Cookie header string
 */
const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    cookies[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return cookies;
};

/**
 * Socket.IO JWT Authentication Middleware
 */
const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookies = parseCookies(socket.handshake.headers.cookie);
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace('Bearer ', '') ||
      cookies.accessToken;

    if (!token) {
      // Allow guest connection in dev mode with fallback user
      socket.user = {
        _id: 'guest_user_' + socket.id,
        name: 'Guest Developer',
        role: 'developer',
      };
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || 'aidevhub_access_secret_key_2026_super_secure'
    );

    const user = await User.findById(decoded?._id).select('-password');
    if (!user) {
      socket.user = { _id: decoded._id, name: decoded.name || 'Developer', role: 'developer' };
    } else {
      socket.user = user;
    }

    next();
  } catch (error) {
    logger.warn(`Socket Auth Warning: ${error.message} - fallback to guest session.`);
    socket.user = {
      _id: 'guest_' + Date.now(),
      name: 'Guest Developer',
      role: 'developer',
    };
    next();
  }
};

/**
 * Initializes Socket.IO Server attached to HTTP Server instance
 * 
 * @param {Object} httpServer - Node.js HTTP Server instance
 */
export const initSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Register JWT Auth Middleware
  io.use(socketAuthMiddleware);

  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    const userRoom = `user_${userId}`;

    // Join personal user room for targeted notifications
    socket.join(userRoom);
    logger.info(`🔌 Socket Connected: [${socket.id}] - User: ${socket.user.name} (${userId})`);

    // Acknowledge connection
    socket.emit('connected_status', {
      connected: true,
      socketId: socket.id,
      user: {
        id: userId,
        name: socket.user.name,
      },
      serverTime: new Date().toISOString(),
    });

    // 1. Join Room Event
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      logger.info(`Socket [${socket.id}] joined room: ${roomId}`);
      socket.emit('room_joined', { roomId, status: 'SUCCESS' });
    });

    // 2. Real-Time AI Chat Streaming Event
    socket.on('send_chat_message', async (data) => {
      const { roomId = 'global_ai_chat', message } = data;

      // Broadcast user message to room
      const userMessagePayload = {
        id: `msg_${Date.now()}`,
        sender: socket.user.name,
        senderId: userId,
        message,
        timestamp: new Date().toISOString(),
      };
      io.to(roomId).emit('receive_chat_message', userMessagePayload);

      // Simulate streaming AI response chunks in real-time
      const aiResponseText = `I have analyzed your query "${message}". Based on AIDevHub's architecture, I recommend breaking this into microservices with Redis caching.`;
      const chunks = aiResponseText.split(' ');

      let fullAiText = '';
      for (let i = 0; i < chunks.length; i++) {
        await new Promise((res) => setTimeout(res, 50));
        fullAiText += chunks[i] + ' ';
        socket.emit('ai_stream_chunk', {
          roomId,
          chunk: chunks[i] + ' ',
          fullText: fullAiText,
          isComplete: i === chunks.length - 1,
        });
      }
    });

    // 3. Live Typing Indicator Event
    socket.on('typing', (data) => {
      const { roomId = 'global_ai_chat', isTyping } = data;
      socket.to(roomId).emit('user_typing', {
        userId,
        userName: socket.user.name,
        isTyping,
      });
    });

    // 4. Disconnect Event
    socket.on('disconnect', (reason) => {
      logger.info(`🔌 Socket Disconnected: [${socket.id}] - Reason: ${reason}`);
    });
  });

  return io;
};

/**
 * Returns active Socket.IO server instance
 */
export const getIo = () => {
  if (!io) {
    throw new Error('Socket.IO Server has not been initialized!');
  }
  return io;
};

/**
 * Triggers live real-time notification to a specific user
 * 
 * @param {String} userId - Recipient User ID
 * @param {Object} notification - Notification payload object
 */
export const sendLiveNotification = (userId, notification) => {
  if (io) {
    const userRoom = `user_${userId}`;
    io.to(userRoom).emit('notification_event', {
      ...notification,
      receivedAt: new Date().toISOString(),
    });
    logger.info(`🔔 Live WebSocket Notification pushed to room [${userRoom}]`);
  }
};
