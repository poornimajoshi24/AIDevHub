import { Router } from 'express';
import {
  auditRepository,
  getUserGithubAudits,
  getGithubAuditById,
  deleteGithubAudit,
} from '../controllers/githubController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

router.use(verifyJWT);

// POST /api/v1/github/audit
router.post('/audit', auditRepository);

// GET /api/v1/github (Paginated, Filtered, Sorted, & Cached for 5 minutes)
router.get('/', cacheMiddleware(300), getUserGithubAudits);

// GET /api/v1/github/:id (Cached for 5 minutes)
router.get('/:id', cacheMiddleware(300), getGithubAuditById);

// DELETE /api/v1/github/:id
router.delete('/:id', deleteGithubAudit);

export default router;
