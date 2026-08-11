import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

/**
 * Global Rate Limiter: 100 requests per 15 minutes window
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many requests from this IP. Please try again after 15 minutes.'));
  },
});

/**
 * Strict Auth Rate Limiter: 5 requests per 15 minutes window for login/register
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Allow up to 10 attempts per 15m window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new ApiError(
        429,
        'Too many authentication attempts from this IP. Please try again after 15 minutes.'
      )
    );
  },
});
