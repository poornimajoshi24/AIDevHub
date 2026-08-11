import dotenv from 'dotenv';
import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { logger } from './src/config/logger.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;

// Catch Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', { message: err.message, stack: err.stack });
  process.exit(1);
});

// Initialize Database Connection & Start Express Server
const startServer = async () => {
  try {
    // Attempt DB Connection
    await connectDB();
  } catch (error) {
    logger.warn('⚠️ MongoDB connection could not be established immediately. Starting server in fallback mode...');
  }

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
};

startServer();
