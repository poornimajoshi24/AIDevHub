import fs from 'fs';
import path from 'path';
import { logger } from '../config/logger.js';

const runDevOpsConfigTest = async () => {
  logger.info('🐳 Starting Week 10 DevOps, Deployment & CI/CD Pipeline Verification Test...');

  const filesToCheck = [
    { name: 'Dockerfile', path: path.resolve('Dockerfile'), requiredContent: ['FROM node:20-alpine AS runner', 'USER nodeuser', 'EXPOSE 5001'] },
    { name: 'docker-compose.yml', path: path.resolve('docker-compose.yml'), requiredContent: ['services:', 'mongo:', 'redis:', 'app:', 'proxy:'] },
    { name: 'nginx.conf', path: path.resolve('nginx.conf'), requiredContent: ['upstream node_app', 'server app:5001;', 'client_max_body_size 20M;'] },
    { name: '.dockerignore', path: path.resolve('.dockerignore'), requiredContent: ['node_modules', 'logs', '.env'] },
    { name: 'GitHub Actions Workflow', path: path.resolve('../.github/workflows/deploy.yml'), requiredContent: ['name: AIDevHub CI/CD Pipeline', 'npm test', 'docker/build-push-action'] },
  ];

  let errors = 0;

  filesToCheck.forEach((file) => {
    if (!fs.existsSync(file.path)) {
      logger.error(`❌ Missing DevOps config file: ${file.name} (${file.path})`);
      errors++;
      return;
    }

    const content = fs.readFileSync(file.path, 'utf-8');
    const missingPatterns = file.requiredContent.filter((pattern) => !content.includes(pattern));

    if (missingPatterns.length > 0) {
      logger.error(`❌ ${file.name} is missing required patterns: ${missingPatterns.join(', ')}`);
      errors++;
    } else {
      logger.info(`✅ Verified ${file.name} structure & configuration patterns.`);
    }
  });

  if (errors > 0) {
    logger.error(`❌ DevOps verification failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    logger.info('🎉 Week 10 DevOps, Deployment & CI/CD Verification Test Passed 100%!');
    process.exit(0);
  }
};

runDevOpsConfigTest();
