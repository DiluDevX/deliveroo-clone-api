import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, StatusCodes.NOT_FOUND, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, StatusCodes.FORBIDDEN, 'FORBIDDEN');
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST, 'BAD_REQUEST');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, StatusCodes.CONFLICT, 'CONFLICT');
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service Unavailable') {
    super(message, StatusCodes.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE');
  }
}
