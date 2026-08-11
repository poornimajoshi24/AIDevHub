import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { User } from '../models/User.model.js';

/**
 * Authentication Middleware: Verifies JWT token from HttpOnly cookies or Bearer Authorization header
 */
export const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request. Authentication token is missing.');
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || 'aidevhub_access_secret_key_2026_super_secure'
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid authentication token. User no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid or expired authentication token.');
  }
});

/**
 * Role-Based Access Control (RBAC) Middleware: Restricts access to specific user roles
 * 
 * @param {...String} allowedRoles - Permitted user roles (e.g. 'admin', 'staff_architect')
 */
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Forbidden. Role '${req.user?.role || 'guest'}' is not authorized to access this resource.`
        )
      );
    }
    next();
  };
};
