import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { logger } from './logger.js';

let mongoMemoryServerInstance = null;

/**
 * Connects to MongoDB using Mongoose driver
 * Automatically falls back to MongoMemoryServer in development if local daemon is absent
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aidevhub';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });

    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    logger.info('⚡ External MongoDB instance not detected. Starting in-memory MongoDB instance...');
    try {
      mongoMemoryServerInstance = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServerInstance.getUri();
      const memoryConn = await mongoose.connect(memoryUri);
      logger.info(`🍃 Connected to In-Memory MongoDB at: ${memoryUri}`);
      return memoryConn;
    } catch (memErr) {
      logger.error(`MongoDB connection failure: ${memErr.message}`);
      throw memErr;
    }
  }
};
