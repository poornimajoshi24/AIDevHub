/**
 * Custom Error Class for handling operational API errors throughout the application
 */
export class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = 'Internal Server Error',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
