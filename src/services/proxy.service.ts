import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../config/environment';
import { logger } from '../utils/logger';
import { ServiceUnavailableError } from '../utils/errors';
import { MICROSERVICE_NAMES } from '../utils/constants';

interface MicroserviceClient {
  baseURL: string;
  apiKey: string;
  client: AxiosInstance;
}

type ForwardedActorHeaders = {
  'x-actor-type': string | undefined;
  'x-actor-id': string | undefined;
  'x-actor-user-id': string | undefined;
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
    headers: Request['headers']
  ): ForwardedActorHeaders {
    const actorType = headers['x-actor-type'];
    const actorId = headers['x-actor-id'];
    const actorUserId = headers['x-actor-user-id'];

    if (typeof actorType !== 'string') {
      return {
        'x-actor-type': undefined,
        'x-actor-id': typeof actorId === 'string' ? actorId : undefined,
        'x-actor-user-id': typeof actorUserId === 'string' ? actorUserId : undefined,
      };
    }

    if (serviceName !== MICROSERVICE_NAMES.RESTAURANT_SERVICE) {
      return {
        'x-actor-type': actorType,
        'x-actor-id': typeof actorId === 'string' ? actorId : undefined,
        'x-actor-user-id': typeof actorUserId === 'string' ? actorUserId : undefined,
      };
    }

    if (actorType === 'PLATFORM_ADMIN') {
      return {
        'x-actor-type': 'ADMIN',
        'x-actor-id': typeof actorId === 'string' ? actorId : undefined,
        'x-actor-user-id': typeof actorUserId === 'string' ? actorUserId : undefined,
      };
    }

    if (actorType === 'RESTAURANT_ADMIN') {
      const restaurantId = headers['x-actor-restaurant-id'];

      return {
        'x-actor-type': 'RESTAURANT',
        'x-actor-id': typeof restaurantId === 'string' ? restaurantId : undefined,
        'x-actor-user-id': typeof actorUserId === 'string' ? actorUserId : undefined,
      };
    }

    return {
      'x-actor-type': actorType,
      'x-actor-id': typeof actorId === 'string' ? actorId : undefined,
      'x-actor-user-id': typeof actorUserId === 'string' ? actorUserId : undefined,
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
    const actorHeaders = this.getForwardedActorHeaders(serviceName, headers);

    const safeHeaders = {
      accept: headers.accept,
      'content-type': headers['content-type'],
      authorization: headers.authorization,
      'user-agent': headers['user-agent'],
      'accept-encoding': headers['accept-encoding'],
      'x-forwarded-for': req.ip,
      'x-api-key': client.apiKey,
      ...actorHeaders,
      'x-user-id': headers['x-user-id'] as string,
      'x-user-email': headers['x-user-email'] as string,
      'x-user-first-name': headers['x-user-first-name'] as string,
      'x-user-last-name': headers['x-user-last-name'] as string,
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
