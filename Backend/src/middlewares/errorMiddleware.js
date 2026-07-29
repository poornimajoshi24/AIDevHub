import { ApiError } from '../utils/ApiError.js';
import { logger } from '../config/logger.js';

/**
 * Centralized Express Error Handling Middleware
 */
export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Normalize standard errors into ApiError instances if needed
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error.errors || [], err.stack);
  }

  // Log error using Winston logger
  logger.error(`[${req.method} ${req.url}] - ${error.statusCode} ${error.message}`, {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    stack: error.stack,
  });

  // Construct standard error payload
  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors.length > 0 ? error.errors : undefined,
    // Show stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};
