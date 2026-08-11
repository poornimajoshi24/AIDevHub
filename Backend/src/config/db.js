import mongoose from 'mongoose';
import { logger } from './logger.js';

let mongoMemoryServerInstance = null;

export const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/aidevhub';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    logger.info(
      `🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );

    return conn;
  } catch (error) {

    // Never fall back to an in-memory DB in production
    if (process.env.NODE_ENV === 'production') {
      logger.error(`MongoDB connection failure: ${error.message}`);
      throw error;
    }

    // Development-only fallback
    logger.info(
      '⚡ External MongoDB instance not detected. Starting in-memory MongoDB...'
    );

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');

      mongoMemoryServerInstance = await MongoMemoryServer.create();

      const memoryUri = mongoMemoryServerInstance.getUri();

      const memoryConn = await mongoose.connect(memoryUri);

      logger.info(
        `🍃 Connected to In-Memory MongoDB at: ${memoryUri}`
      );

      return memoryConn;
    } catch (memErr) {
      logger.error(
        `MongoDB connection failure: ${memErr.message}`
      );

      throw memErr;
    }
  }
};