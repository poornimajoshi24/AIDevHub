import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Unprotected Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected Auth Routes (Require verifyJWT)
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getCurrentUser);

export default router;
