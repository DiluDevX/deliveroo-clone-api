'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.proxyService = void 0;
const axios_1 = __importDefault(require('axios'));
const environment_1 = require('../config/environment');
const logger_1 = require('../utils/logger');
const errors_1 = require('../utils/errors');
const constants_1 = require('../utils/constants');
class ProxyService {
  constructor() {
    this.clients = {
      [constants_1.MICROSERVICE_NAMES.AUTH_SERVICE]: {
        baseURL: environment_1.environment.authService.url,
        apiKey: environment_1.environment.authService.apiKey,
        client: this.createClient(
          environment_1.environment.authService.url,
          environment_1.environment.authService.apiKey
        ),
      },
      [constants_1.MICROSERVICE_NAMES.ORDER_SERVICE]: {
        baseURL: environment_1.environment.orderService.url,
        apiKey: environment_1.environment.orderService.apiKey,
        client: this.createClient(
          environment_1.environment.orderService.url,
          environment_1.environment.orderService.apiKey
        ),
      },
      [constants_1.MICROSERVICE_NAMES.PAYMENT_SERVICE]: {
        baseURL: environment_1.environment.paymentService.url,
        apiKey: environment_1.environment.paymentService.apiKey,
        client: this.createClient(
          environment_1.environment.paymentService.url,
          environment_1.environment.paymentService.apiKey
        ),
      },
    };
  }
  createClient(baseURL, apiKey) {
    return axios_1.default.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
  }
  proxyRequest(serviceName, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      const client = this.clients[serviceName];
      if (!client) {
        next(new errors_1.ServiceUnavailableError(`Service ${serviceName} not available`));
        return;
      }
      const { method, path, headers, body, query } = req;
      const config = {
        method,
        url: path.replace(/^\/api/, ''),
        headers: Object.assign(Object.assign({}, headers), {
          'x-forwarded-for': req.ip,
          'x-api-key': client.apiKey,
        }),
        params: query,
        data: body,
      };
      try {
        logger_1.logger.info(
          {
            service: serviceName,
            method,
            path: config.url,
          },
          `Proxying request to ${serviceName} service`
        );
        const response = yield client.client.request(config);
        res.status(response.status).json(response.data);
      } catch (error) {
        if (axios_1.default.isAxiosError(error)) {
          if (error.response) {
            res.status(error.response.status).json(error.response.data);
          } else if (error.request) {
            next(new errors_1.ServiceUnavailableError(`Service ${serviceName} is not responding`));
          } else {
            next(error);
          }
        } else {
          next(error);
        }
      }
    });
  }
  createProxyHandler(serviceName) {
    return (req, res, next) => {
      return this.proxyRequest(serviceName, req, res, next);
    };
  }
}
exports.proxyService = new ProxyService();
