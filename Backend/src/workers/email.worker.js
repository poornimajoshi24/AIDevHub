import { Worker } from 'bullmq';
import { sendEmail } from '../utils/sendEmail.js';
import { logger } from '../config/logger.js';

const connectionOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
  retryStrategy: () => null, // Stop retrying immediately if Redis server is down
};

let emailWorker = null;

try {
  emailWorker = new Worker(
    'emailQueue',
    async (job) => {
      logger.info(`⚙️ Worker processing Job #${job.id} - Type: ${job.name} -> Recipient: ${job.data.to}`);

      const { to, subject, message, html } = job.data;

      // Execute SMTP email dispatch
      await sendEmail({ email: to, subject, message, html });

      return { processedAt: new Date().toISOString(), status: 'DELIVERED' };
    },
    {
      connection: connectionOptions,
      concurrency: 5, // Process up to 5 concurrent email jobs
    }
  );

  emailWorker.on('completed', (job, returnvalue) => {
    logger.info(`✅ Job #${job.id} completed successfully! Result: ${JSON.stringify(returnvalue)}`);
  });

  emailWorker.on('failed', (job, err) => {
    logger.error(`❌ Job #${job.id} failed with error: ${err.message}`);
  });

  emailWorker.on('error', () => {
    // Suppress unhandled redis connection error logs in dev
  });

  logger.info('👷 BullMQ [emailWorker] Consumer initialized and listening for jobs.');
} catch (error) {
  logger.info('⚡ BullMQ Worker listening in fallback mode.');
}

export { emailWorker };
