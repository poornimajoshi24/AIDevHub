import { Router } from 'express';
import {
  uploadAndAnalyzeResume,
  getUserResumes,
  getResumeById,
  deleteResume,
} from '../controllers/resumeController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = Router();

// Require verifyJWT for all resume endpoints
router.use(verifyJWT);

// POST /api/v1/resumes/upload (File upload via Multer)
router.post('/upload', upload.single('resume'), uploadAndAnalyzeResume);

// GET /api/v1/resumes (Paginated, Filtered, Sorted, & Cached for 5 minutes)
router.get('/', cacheMiddleware(300), getUserResumes);

// GET /api/v1/resumes/:id (Cached for 5 minutes)
router.get('/:id', cacheMiddleware(300), getResumeById);

// DELETE /api/v1/resumes/:id
router.delete('/:id', deleteResume);

export default router;
