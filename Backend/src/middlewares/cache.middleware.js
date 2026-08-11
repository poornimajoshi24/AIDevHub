import { getCache, setCache, deleteUserCache } from '../config/redis.js';
import { logger } from '../config/logger.js';

/**
 * Cache-Aside Middleware for Express GET Endpoints
 * Constructs user-scoped keys to prevent cross-user caching conflicts
 * 
 * @param {Number} ttlSeconds - Time-To-Live in seconds (default 300s = 5m)
 */
export const cacheMiddleware = (ttlSeconds = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const userId = req.user?._id ? req.user._id.toString() : 'guest';
    const cacheKey = `cache:${userId}:${req.originalUrl}`;

    try {
      const cachedData = await getCache(cacheKey);

      if (cachedData) {
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('X-Cache-Key', cacheKey);
        return res.status(200).json(cachedData);
      }
    } catch (error) {
      logger.warn(`Cache read error: ${error.message}`);
    }

    // Cache Miss: Intercept res.json to cache response payload
    res.setHeader('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      // Only cache successful 200 responses
      if (res.statusCode === 200 && body && body.success) {
        setCache(cacheKey, body, ttlSeconds).catch((err) =>
          logger.warn(`Cache write error: ${err.message}`)
        );
      }
      return originalJson(body);
    };

    next();
  };
};

/**
 * Helper to invalidate user cache upon data modification
 */
export const clearUserCache = async (userId) => {
  if (userId) {
    await deleteUserCache(userId.toString());
  }
};
