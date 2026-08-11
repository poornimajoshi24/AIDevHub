import { Router } from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { verifyJWT, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Protect all admin routes with verifyJWT and RBAC restriction
router.use(verifyJWT);

// GET /api/v1/admin/stats (Only accessible to 'admin' and 'staff_architect' roles)
router.get('/stats', restrictTo('admin', 'staff_architect'), getAdminStats);

export default router;
