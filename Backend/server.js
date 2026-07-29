import dotenv from 'dotenv';
import { app } from './src/app.js';
import { logger } from './src/config/logger.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Catch Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', { message: err.message, stack: err.stack });
  process.exit(1);
});

// Start Express Server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
  logger.info(`🏥 Health check available at: http://localhost:${PORT}/api/v1/health`);
});

// Catch Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down server...', { message: err.message, stack: err.stack });
  server.close(() => {
    process.exit(1);
  });
});
