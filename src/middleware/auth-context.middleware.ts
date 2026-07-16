import { Request, Response, NextFunction } from 'express';
import axios, { AxiosError } from 'axios';
import { environment } from '../config/environment';
import { logger } from '../utils/logger';
import { UnauthorizedError, ServiceUnavailableError } from '../utils/errors';
import { GetMeResponseDTO, ActorContextDTO, ActorType } from '../dtos/auth.dto';

export interface AuthenticatedRequest extends Request {
  actor?: ActorContextDTO;
}

function isAuthServiceUnavailable(error: AxiosError): boolean {
  return error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT';
}

function mapRoleToActorType(role?: string): ActorType {
  const roleToActorType: Record<string, ActorType> = {
    user: 'USER',
    platform_admin: 'PLATFORM_ADMIN',
    restaurant_user: 'RESTAURANT',
  };

  return roleToActorType[role ?? ''] || 'USER';
}

function getPrimaryRestaurantId(user: NonNullable<GetMeResponseDTO['data']>): string | undefined {
  return user.restaurantId ?? user.restaurantUsers?.[0]?.restaurantId;
}

/**
 * Auth Context Middleware
 *
 * This middleware:
 * 1. Extracts the Bearer token from Authorization header
 * 2. Verifies the token by calling auth-service /v1/auth/me
 * 3. On success, injects verified actor headers into the request
 * 4. On failure, returns 401 Unauthorized
 */
export async function authContextMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      logger.warn('Missing Authorization header');
      throw new UnauthorizedError('Authorization header is required');
    }

    if (!authHeader.startsWith('Bearer ')) {
      logger.warn('Invalid Authorization header format');
      throw new UnauthorizedError('Invalid Authorization header format. Expected: Bearer <token>');
    }

    const accessToken = authHeader.slice(7); // Remove 'Bearer ' prefix

    // Call auth-service to verify token and get user info
    const authServiceResponse = await axios.get<GetMeResponseDTO>(
      `${environment.authService.url}/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-api-key': environment.authService.apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    const user = authServiceResponse.data?.data;

    if (!user?.id) {
      logger.warn(
        { response: authServiceResponse.data },
        'Auth service returned invalid user data'
      );
      throw new UnauthorizedError('Unable to verify user identity');
    }

    const actorType = mapRoleToActorType(user.role);
    const restaurantId = getPrimaryRestaurantId(user);
    const restaurantRole = user.restaurantRole ?? user.restaurantUsers?.[0]?.role;

    logger.info(
      { userId: user.id, email: user.email, role: user.role, restaurantId },
      'User authenticated successfully'
    );

    // Inject verified actor headers into request
    req.headers['x-user-id'] = user.id;
    req.headers['x-actor-id'] = user.id;
    req.headers['x-actor-user-id'] = user.id;
    req.headers['x-actor-type'] = actorType;
    if (restaurantId) {
      req.headers['x-actor-restaurant-id'] = restaurantId;
    }
    if (restaurantRole) {
      req.headers['x-actor-restaurant-role'] = restaurantRole;
    }
    req.headers['x-user-email'] = user.email;
    req.headers['x-user-first-name'] = user.firstName;
    req.headers['x-user-last-name'] = user.lastName;

    // Store actor context on request for potential use in BFF logic
    (req as AuthenticatedRequest).actor = {
      userId: user.id,
      actorId: user.id,
      actorUserId: user.id,
      actorType,
      restaurantId,
      restaurantRole,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (isAuthServiceUnavailable(axiosError)) {
        logger.error(
          { service: 'auth-service', error: axiosError.message },
          'Auth service connection failed'
        );
        next(new ServiceUnavailableError('Auth service is temporarily unavailable'));
        return;
      }

      if (axiosError.response?.status === 401) {
        logger.info('Token verification failed: invalid or expired token');
        next(new UnauthorizedError('Invalid or expired access token'));
        return;
      }

      if (axiosError.response?.status === 403) {
        logger.warn('Token verification failed: forbidden');
        next(new UnauthorizedError('Access forbidden: insufficient permissions'));
        return;
      }

      logger.error(
        { status: axiosError.response?.status, data: axiosError.response?.data },
        'Auth service returned error'
      );
      next(new UnauthorizedError('Unable to verify user identity'));
      return;
    }

    if (error instanceof UnauthorizedError) {
      next(error);
      return;
    }

    logger.error({ error }, 'Unexpected error in auth context middleware');
    next(error);
  }
}
