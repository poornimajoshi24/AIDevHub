import Redis from 'ioredis';
import { logger } from './logger.js';

let redisClient = null;
let isRedisConnected = false;

// Fallback in-memory cache map for offline/development execution
const memoryCacheStore = new Map();

/**
 * Initializes Redis Client connection
 */
export const initRedis = () => {
  const redisUri = process.env.REDIS_URI || 'redis://127.0.0.1:6379';

  try {
    redisClient = new Redis(redisUri, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      enableOfflineQueue: false,
    });

    redisClient.on('connect', () => {
      isRedisConnected = true;
      logger.info(`🔴 Redis Connected: ${redisUri}`);
    });

    redisClient.on('error', (err) => {
      if (isRedisConnected) {
        logger.warn(`Redis connection warning: ${err.message}`);
      }
      isRedisConnected = false;
    });
  } catch (error) {
    isRedisConnected = false;
    logger.info('⚡ External Redis instance not detected. Operating in high-speed In-Memory Cache mode.');
  }

  return redisClient;
};

// Initialize client on module load
initRedis();

/**
 * Universal Cache Getter (Tries Redis first, falls back to Memory Store)
 */
export const getCache = async (key) => {
  try {
    if (isRedisConnected && redisClient) {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    }
  } catch (e) {
    isRedisConnected = false;
  }

  // In-Memory Fallback Store
  const item = memoryCacheStore.get(key);
  if (!item) return null;

  if (Date.now() > item.expiry) {
    memoryCacheStore.delete(key);
    return null;
  }

  return item.value;
};

/**
 * Universal Cache Setter (Tries Redis first, falls back to Memory Store)
 */
export const setCache = async (key, value, ttlSeconds = 300) => {
  try {
    if (isRedisConnected && redisClient) {
      await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
      return true;
    }
  } catch (e) {
    isRedisConnected = false;
  }

  // In-Memory Fallback Store
  memoryCacheStore.set(key, {
    value,
    expiry: Date.now() + ttlSeconds * 1000,
  });
  return true;
};

/**
 * Universal Cache Invalidation (Deletes keys matching prefix for specific user)
 */
export const deleteUserCache = async (userId) => {
  const prefix = `cache:${userId}:`;

  try {
    if (isRedisConnected && redisClient) {
      const keys = await redisClient.keys(`${prefix}*`);
      if (keys.length > 0) {
        await redisClient.del(keys);
        logger.info(`🧹 Flushed ${keys.length} Redis cache keys for user [${userId}]`);
      }
    }
  } catch (e) {
    isRedisConnected = false;
  }

  // In-Memory Fallback Store Cleanup
  let flushedCount = 0;
  for (const key of memoryCacheStore.keys()) {
    if (key.startsWith(prefix)) {
      memoryCacheStore.delete(key);
      flushedCount++;
    }
  }

  if (flushedCount > 0) {
    logger.info(`🧹 Flushed ${flushedCount} In-Memory cache keys for user [${userId}]`);
  }
};
