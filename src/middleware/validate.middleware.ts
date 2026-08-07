import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { BadRequestError } from '../utils/errors';
import { logger } from '../utils/logger';

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.info(
          {
            issues: error.issues.map((issue) => ({
              path: issue.path.join('.'),
              message: issue.message,
            })),
          },
          'Request body validation failed'
        );
        next(new BadRequestError('Validation failed'));
        return;
      }
      next(error);
    }
  };
