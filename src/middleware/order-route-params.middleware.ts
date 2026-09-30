import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/errors';

const safeOrderRouteId = /^[A-Za-z0-9_-]{1,64}$/;

export function requireSafeOrderRouteParams(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (Object.values(req.params).some((value) => !safeOrderRouteId.test(value))) {
    next(new BadRequestError('Invalid order route identifier'));
    return;
  }

  next();
}
