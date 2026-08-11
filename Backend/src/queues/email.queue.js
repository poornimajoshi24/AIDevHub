import { Queue } from 'bullmq';
import { sendEmail } from '../utils/sendEmail.js';
import { logger } from '../config/logger.js';

const connectionOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
  retryStrategy: () => null, // Stop retrying immediately if Redis server is down
};

let emailQueue = null;
let isQueueOperational = false;

try {
  emailQueue = new Queue('emailQueue', {
    connection: connectionOptions,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: 100,
    },
  });

  emailQueue.on('error', () => {
    isQueueOperational = false;
  });

  isQueueOperational = true;
  logger.info('📦 BullMQ [emailQueue] Producer initialized successfully.');
} catch (error) {
  isQueueOperational = false;
  logger.info('⚡ BullMQ operating in Async Immediate Fallback mode.');
}

/**
 * Pushes email payload to background queue instantly (< 5ms)
 * 
 * @param {Object} emailPayload - { to, subject, message, html }
 */
export const addEmailToQueue = async (emailPayload) => {
  const { to, subject, message, html } = emailPayload;

  if (isQueueOperational && emailQueue) {
    try {
      const job = await emailQueue.add('sendEmailJob', {
        to,
        subject,
        message,
        html,
        enqueuedAt: new Date().toISOString(),
      });

      logger.info(`📬 Job #${job.id} enqueued to [emailQueue] for recipient: ${to}`);
      return job;
    } catch (error) {
      isQueueOperational = false;
    }
  }

  // Fallback: Dispatch asynchronously off the main request thread
  setImmediate(async () => {
    try {
      await sendEmail({ email: to, subject, message, html });
      logger.info(`📬 [DEV ASYNC FALLBACK] Sent email to: ${to}`);
    } catch (err) {
      logger.error(`Failed async email fallback: ${err.message}`);
    }
  });

  return { id: `fallback_${Date.now()}` };
};

export { emailQueue };
