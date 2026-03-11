'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceUnavailableError =
  exports.InternalServerError =
  exports.ConflictError =
  exports.BadRequestError =
  exports.ForbiddenError =
  exports.UnauthorizedError =
  exports.NotFoundError =
  exports.AppError =
    void 0;
const http_status_codes_1 = require('http-status-codes');
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, http_status_codes_1.StatusCodes.NOT_FOUND, 'NOT_FOUND');
  }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
  }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, http_status_codes_1.StatusCodes.FORBIDDEN, 'FORBIDDEN');
  }
}
exports.ForbiddenError = ForbiddenError;
class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, http_status_codes_1.StatusCodes.BAD_REQUEST, 'BAD_REQUEST');
  }
}
exports.BadRequestError = BadRequestError;
class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, http_status_codes_1.StatusCodes.CONFLICT, 'CONFLICT');
  }
}
exports.ConflictError = ConflictError;
class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR');
  }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends AppError {
  constructor(message = 'Service Unavailable') {
    super(message, http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE');
  }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
