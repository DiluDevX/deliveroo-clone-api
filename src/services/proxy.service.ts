import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../config/environment';
import { logger } from '../utils/logger';
import { ServiceUnavailableError } from '../utils/errors';
import { MICROSERVICE_NAMES } from '../utils/constants';
import { ActorContextDTO } from '../dtos/auth.dto';
import { AuthenticatedRequest } from '../middleware/auth-context.middleware';

interface MicroserviceClient {
  baseURL: string;
  apiKey: string;
  client: AxiosInstance;
}

type ForwardedActorHeaders = {
  'x-actor-type': string | undefined;
  'x-actor-id': string | undefined;
  'x-actor-user-id': string | undefined;
  'x-actor-restaurant-id': string | undefined;
  'x-actor-restaurant-role': string | undefined;
  'x-user-id': string | undefined;
  'x-user-email': string | undefined;
  'x-user-first-name': string | undefined;
  'x-user-last-name': string | undefined;
};

class ProxyService {
  private readonly clients: Record<string, MicroserviceClient>;

  constructor() {
    this.clients = {
      [MICROSERVICE_NAMES.AUTH_SERVICE]: {
        baseURL: environment.authService.url,
        apiKey: environment.authService.apiKey,
        client: this.createClient(environment.authService.url, environment.authService.apiKey),
      },
      [MICROSERVICE_NAMES.ORDER_SERVICE]: {
        baseURL: environment.orderService.url,
        apiKey: environment.orderService.apiKey,
        client: this.createClient(environment.orderService.url, environment.orderService.apiKey),
      },
      [MICROSERVICE_NAMES.PAYMENT_SERVICE]: {
        baseURL: environment.paymentService.url,
        apiKey: environment.paymentService.apiKey,
        client: this.createClient(
          environment.paymentService.url,
          environment.paymentService.apiKey
        ),
      },
      [MICROSERVICE_NAMES.RESTAURANT_SERVICE]: {
        baseURL: environment.restaurantService.url,
        apiKey: environment.restaurantService.apiKey,
        client: this.createClient(
          environment.restaurantService.url,
          environment.restaurantService.apiKey
        ),
      },
    };
  }

  private createClient(baseURL: string, apiKey: string): AxiosInstance {
    return axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
  }

  private mapPath(serviceName: string, originalPath: string): string {
    const servicePaths: Record<string, string> = {
      [MICROSERVICE_NAMES.AUTH_SERVICE]: '/v1',
      [MICROSERVICE_NAMES.ORDER_SERVICE]: '/v1',
      [MICROSERVICE_NAMES.PAYMENT_SERVICE]: '/v1',
      [MICROSERVICE_NAMES.RESTAURANT_SERVICE]: '/v1',
    };

    const pathPrefix = servicePaths[serviceName] || '';
    const cleanPath = originalPath.replace(/^\/api/, '') || '/';

    return pathPrefix ? `${pathPrefix}${cleanPath}` : cleanPath;
  }

  private getForwardedActorHeaders(
    serviceName: string,
    actor: ActorContextDTO | undefined
  ): ForwardedActorHeaders {
    if (!actor) {
      return {
        'x-actor-type': undefined,
        'x-actor-id': undefined,
        'x-actor-user-id': undefined,
        'x-actor-restaurant-id': undefined,
        'x-actor-restaurant-role': undefined,
        'x-user-id': undefined,
        'x-user-email': undefined,
        'x-user-first-name': undefined,
        'x-user-last-name': undefined,
      };
    }

    const isRestaurantService = serviceName === MICROSERVICE_NAMES.RESTAURANT_SERVICE;
    let forwardedActorType: string = actor.actorType;
    let forwardedActorId = actor.actorId;

    if (actor.actorType === 'PLATFORM_ADMIN' && isRestaurantService) {
      forwardedActorType = 'ADMIN';
    }

    if (actor.actorType === 'RESTAURANT' && isRestaurantService) {
      // restaurant-service currently scopes ownership through x-actor-id.
      forwardedActorId = actor.restaurantId ?? actor.actorId;
    }

    return {
      'x-actor-type': forwardedActorType,
      'x-actor-id': forwardedActorId,
      'x-actor-user-id': actor.actorUserId,
      'x-actor-restaurant-id': actor.restaurantId,
      'x-actor-restaurant-role': actor.restaurantRole,
      'x-user-id': actor.userId,
      'x-user-email': actor.email,
      'x-user-first-name': actor.firstName,
      'x-user-last-name': actor.lastName,
    };
  }

  async proxyRequest(
    serviceName: string,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const client = this.clients[serviceName];

    if (!client) {
      next(new ServiceUnavailableError(`Service ${serviceName} not available`));
      return;
    }

    const { method, headers, body, query } = req;
    const baseUrl = req.baseUrl || '';
    const fullPath = baseUrl + req.path || '/';
    const mappedPath = this.mapPath(serviceName, fullPath);
    const actorHeaders = this.getForwardedActorHeaders(
      serviceName,
      (req as AuthenticatedRequest).actor
    );

    const safeHeaders = {
      accept: headers.accept,
      'content-type': headers['content-type'],
      authorization: headers.authorization,
      'user-agent': headers['user-agent'],
      'accept-encoding': headers['accept-encoding'],
      'x-forwarded-for': req.ip,
      'x-api-key': client.apiKey,
      ...actorHeaders,
    };

    const config: AxiosRequestConfig = {
      url: mappedPath,
      method,
      headers: safeHeaders,
      params: query,
      data: body,
    };

    try {
      logger.info(
        {
          service: serviceName,
          method,
          path: config.url,
        },
        `Proxying request to ${serviceName} service`
      );

      const response = await client.client.request(config);

      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
          next(new ServiceUnavailableError(`Service ${serviceName} is not responding`));
        } else {
          next(error);
        }
      } else {
        next(error);
      }
    }
  }

  createProxyHandler(serviceName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      return this.proxyRequest(serviceName, req, res, next);
    };
  }
}

export const proxyService = new ProxyService();
