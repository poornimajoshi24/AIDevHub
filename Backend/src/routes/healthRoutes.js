import { Router } from 'express';
import { getHealthStatus, triggerTestError } from '../controllers/healthController.js';

const router = Router();

// GET /api/v1/health
router.get('/', getHealthStatus);

// GET /api/v1/health/test-error
router.get('/test-error', triggerTestError);

export default router;
