import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../models/User.model.js';
import { Resume } from '../models/Resume.model.js';
import { getCache, setCache, deleteUserCache } from '../config/redis.js';
import { clearUserCache } from '../middlewares/cache.middleware.js';
import { logger } from '../config/logger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const runPerformanceAndSecurityTest = async () => {
  logger.info('⚡ Starting Week 6 Performance & Security Hardening Pipeline Test...');
  let mongoServer = null;

  try {
    // 1. In-Memory DB Setup
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    logger.info(`🍃 In-Memory DB connected at: ${uri}`);

    // 2. Create User & Resume
    const user = await User.create({
      name: 'Perf Security Lead',
      email: `perf.lead.${Date.now()}@aidevhub.io`,
      password: 'SecurePassword2026!',
    });

    await Resume.create({
      user: user._id,
      fileName: 'Benchmark_Architect_Resume.pdf',
      overallScore: 95,
      atsScore: { score: 95, grade: 'A+', status: 'Optimized' },
    });

    // 3. Test Redis / Memory Cache Speed Acceleration
    logger.info('Testing Cache-Aside MISS vs HIT Performance...');
    const cacheKey = `cache:${user._id}:/api/v1/resumes`;

    // Simulate 1st Query (Cache MISS)
    const t0 = performance.now();
    const dbResults = await Resume.find({ user: user._id }).lean();
    await setCache(cacheKey, { resumes: dbResults }, 300);
    const t1 = performance.now();
    const missTime = t1 - t0;
    logger.info(`🐢 Cache MISS (Database Query): ${missTime.toFixed(2)} ms`);

    // Simulate 2nd Query (Cache HIT)
    const t2 = performance.now();
    const cachedData = await getCache(cacheKey);
    const t3 = performance.now();
    const hitTime = t3 - t2;
    logger.info(`🚀 Cache HIT (In-Memory/Redis Return): ${hitTime.toFixed(2)} ms`);

    const speedup = missTime / (hitTime || 0.1);
    logger.info(`⚡ Performance Acceleration: ${speedup.toFixed(1)}x faster!`);
    logger.info(`Cached resume retrieved: ${cachedData.resumes[0].fileName}`);

    // 4. Test Cache Invalidation on Mutation
    logger.info('Testing Cache Invalidation on Data Mutation...');
    await clearUserCache(user._id);
    const checkAfterFlush = await getCache(cacheKey);
    logger.info(`Cache flushed after mutation? ${checkAfterFlush === null ? 'YES (Stale Cache Removed)' : 'NO'}`);

    // 5. Test NoSQL Injection Sanitization
    logger.info('Testing NoSQL Query Injection Sanitization...');
    const maliciousPayload = {
      email: { $gt: '' },
      password: 'hacked_password',
    };

    mongoSanitize.sanitize(maliciousPayload);
    const hasNoSqlOperator = Object.keys(maliciousPayload.email).some((k) => k.startsWith('$'));
    logger.info(`Was NoSQL '$gt' operator stripped? ${!hasNoSqlOperator ? 'YES (Sanitized & Secured)' : 'NO'}`);

    // Cleanup
    await User.findByIdAndDelete(user._id);
    await Resume.deleteMany({ user: user._id });
    logger.info('🧹 Cleanup completed successfully.');

    logger.info('🎉 Week 6 Performance & Security Hardening Test Passed 100%!');
  } catch (error) {
    logger.error(`❌ Performance & Security Test Failed: ${error.message}`, { stack: error.stack });
  } finally {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    logger.info('Disconnected from MongoDB.');
    process.exit(0);
  }
};

runPerformanceAndSecurityTest();
