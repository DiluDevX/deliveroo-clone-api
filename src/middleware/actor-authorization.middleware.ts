import { NextFunction, Request, Response } from 'express';
import { ActorType } from '../dtos/auth.dto';
import { AuthenticatedRequest } from './auth-context.middleware';
import { ForbiddenError } from '../utils/errors';

export const requireActorTypes =
  (...allowedActorTypes: ActorType[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const actor = (req as AuthenticatedRequest).actor;

    if (!actor || !allowedActorTypes.includes(actor.actorType)) {
      next(new ForbiddenError('This account type cannot access this resource'));
      return;
    }

    next();
  };
