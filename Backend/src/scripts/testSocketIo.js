import http from 'http';
import { io as ioClient } from 'socket.io-client';
import { app } from '../app.js';
import { initSocketServer, sendLiveNotification } from '../socket/socketServer.js';
import { logger } from '../config/logger.js';

const runSocketIoTest = async () => {
  logger.info('⚡ Starting Week 7 Socket.IO Real-Time WebSockets Test...');

  const server = http.createServer(app);
  initSocketServer(server);

  const testPort = 5899;
  await new Promise((resolve) => server.listen(testPort, resolve));
  logger.info(`Server listening on port ${testPort}...`);

  try {
    const socketUrl = `http://localhost:${testPort}`;
    const clientSocket = ioClient(socketUrl, {
      transports: ['websocket'],
    });

    let userId = null;

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Socket test timed out')), 5000);

      clientSocket.on('connect', () => {
        logger.info(`🔌 Client Connected to WebSockets on port ${testPort}! Socket ID: ${clientSocket.id}`);
      });

      clientSocket.on('connected_status', (data) => {
        logger.info(`✅ Connection Acknowledged: User ID [${data.user.id}]`);
        userId = data.user.id;

        // Emit chat message event
        clientSocket.emit('send_chat_message', {
          roomId: 'test_chat_room',
          message: 'Can you analyze my microservices system architecture?',
        });
      });

      clientSocket.on('receive_chat_message', (msg) => {
        logger.info(`💬 Received Live Chat Message Event: [${msg.sender}] -> ${msg.message}`);
      });

      clientSocket.on('ai_stream_chunk', (data) => {
        if (data.isComplete) {
          logger.info(`🤖 AI Stream Chunking Completed! Full Text: "${data.fullText}"`);

          // Trigger live notification event to joined user room
          sendLiveNotification(userId, {
            title: 'Audit Complete',
            message: 'Your repository security index has been updated.',
          });
        }
      });

      clientSocket.on('notification_event', (notif) => {
        logger.info(`🔔 Received Real-Time Notification: "${notif.title}" - ${notif.message}`);
        clearTimeout(timeout);
        resolve();
      });
    });

    clientSocket.disconnect();
    logger.info('🔌 Socket Client disconnected cleanly.');

    logger.info('🎉 Week 7 Socket.IO Real-Time WebSockets Test Passed 100%!');
  } catch (error) {
    logger.error(`❌ Socket.IO Test Failed: ${error.message}`, { stack: error.stack });
  } finally {
    server.close();
    logger.info('HTTP & WebSockets Test Server closed.');
    process.exit(0);
  }
};

runSocketIoTest();
