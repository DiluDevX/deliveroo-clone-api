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
    };

    const pathPrefix = servicePaths[serviceName] || '';
    const cleanPath = originalPath.replace(/^\/api/, '') || '/';

    return pathPrefix ? `${pathPrefix}${cleanPath}` : cleanPath;
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

    const safeHeaders = {
      accept: headers.accept,
      'content-type': headers['content-type'],
      authorization: headers.authorization,
      'user-agent': headers['user-agent'],
      'accept-encoding': headers['accept-encoding'],
      'x-forwarded-for': req.ip,
      'x-api-key': client.apiKey,
      'x-actor-type': headers['x-actor-type'] as string,
      'x-actor-id': headers['x-actor-id'] as string,
      'x-actor-user-id': headers['x-actor-user-id'] as string,
      'x-user-id': headers['x-user-id'] as string,
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
