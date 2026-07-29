import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Health Check Controller
 * GET /api/v1/health
 */
export const getHealthStatus = AsyncHandler(async (req, res) => {
  const healthData = {
    status: 'UP',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    memoryUsage: process.memoryUsage(),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, 'Backend service is healthy & operational.'));
});

/**
 * Test Error Controller (For testing centralized error handler)
 * GET /api/v1/health/test-error
 */
export const triggerTestError = AsyncHandler(async (req, res) => {
  throw new ApiError(
    400,
    'Deliberate test error: ApiError caught successfully by global error middleware!',
    ['Field "test" is missing', 'Invalid request simulation']
  );
});
