/**
 * Async Handler Wrapper for Express controllers
 * Eliminates repetitive try-catch blocks in route handlers
 * 
 * @param {Function} requestHandler - Async Express controller function
 */
export const AsyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
