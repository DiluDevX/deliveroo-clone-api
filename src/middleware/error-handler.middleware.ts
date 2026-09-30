import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { environment } from '../config/environment';
import { EnvironmentEnum } from '../utils/constants';

interface ErrorResponseDTO {
  success: boolean;
  message: string;
  code?: string;
  stack?: string;
}

function handleAppError(err: AppError, res: Response): void {
  const response: ErrorResponseDTO = {
    success: false,
    message: err.message,
    code: err.code,
  };

  if (environment.env !== EnvironmentEnum.Production) {
    response.stack = err.stack;
  }

  res.status(err.statusCode).json(response);
}

function handleAxiosError(err: unknown, res: Response): boolean {
  if (err && typeof err === 'object' && 'isAxiosError' in err) {
    const axiosError = err as {
      isAxiosError: boolean;
      response?: { status: number; data: unknown };
    };
    if (axiosError.response) {
      res.status(axiosError.response.status).json(axiosError.response.data);
      return true;
    }
  }
  return false;
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  logger.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  if (err instanceof AppError) {
    handleAppError(err, res);
    return;
  }

  if (handleAxiosError(err, res)) {
    return;
  }

  const response: ErrorResponseDTO = {
    success: false,
    message:
      environment.env === EnvironmentEnum.Production
        ? 'Internal Server Error'
        : (err.message ?? 'Internal Server Error'),
  };

  if (environment.env !== EnvironmentEnum.Production) {
    response.stack = err.stack;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}
