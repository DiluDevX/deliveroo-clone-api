import { NextFunction, Request, Response } from 'express';

const INTERNAL_IDENTITY_HEADERS = [
  'x-actor-type',
  'x-actor-id',
  'x-actor-user-id',
  'x-actor-restaurant-id',
  'x-actor-restaurant-role',
  'x-user-id',
  'x-user-email',
  'x-user-first-name',
  'x-user-last-name',
] as const;

export function stripInternalIdentityHeaders(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  for (const header of INTERNAL_IDENTITY_HEADERS) {
    delete req.headers[header];
  }

  next();
}
