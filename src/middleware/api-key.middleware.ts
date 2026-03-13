import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import crypto from 'node:crypto';

const keyCompareTimingSafe = (a: string, b: string): boolean => {
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
};

export function apiKeyMiddleware(allowedKeys: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const apiKey = req.headers['x-api-key'] as string | undefined;

    if (!apiKey) {
      next(new UnauthorizedError('API key is required'));
      return;
    }

    if (!allowedKeys.some((key) => keyCompareTimingSafe(key, apiKey))) {
      next(new UnauthorizedError('Invalid API key'));
      return;
    }

    next();
  };
}
