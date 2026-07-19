import { NextFunction, Request, Response } from 'express';
import { ActorType, RestaurantRole } from '../dtos/auth.dto';
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

export const requireRestaurantRoles =
  (...allowedRoles: RestaurantRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const actor = (req as AuthenticatedRequest).actor;

    if (
      !actor ||
      actor.actorType !== 'RESTAURANT' ||
      !actor.restaurantRole ||
      !allowedRoles.includes(actor.restaurantRole)
    ) {
      next(new ForbiddenError('Your restaurant role cannot access this resource'));
      return;
    }

    next();
  };

export const requirePlatformAdminOrRestaurantRoles =
  (...allowedRoles: RestaurantRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const actor = (req as AuthenticatedRequest).actor;

    if (actor?.actorType === 'PLATFORM_ADMIN') {
      next();
      return;
    }

    if (
      !actor ||
      actor.actorType !== 'RESTAURANT' ||
      !actor.restaurantRole ||
      !allowedRoles.includes(actor.restaurantRole)
    ) {
      next(new ForbiddenError('Your restaurant role cannot access this resource'));
      return;
    }

    next();
  };
