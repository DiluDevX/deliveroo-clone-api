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
const express_1 = __importDefault(require('express'));
const mongoose_1 = __importDefault(require('mongoose'));
const cors_1 = __importDefault(require('cors'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const logger_1 = require('./utils/logger');
const environment_1 = require('./config/environment');
const error_handler_middleware_1 = require('./middleware/error-handler.middleware');
const rate_limiter_middleware_1 = require('./middleware/rate-limiter.middleware');
const routes_1 = __importDefault(require('./routes'));
const app = (0, express_1.default)();
let isShuttingDown = false;
app.use((0, cors_1.default)({ origin: environment_1.environment.baseUrl, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(rate_limiter_middleware_1.rateLimiterMiddleware);
app.use(routes_1.default);
app.use(error_handler_middleware_1.errorHandler);
function startServer() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const databaseUrl = environment_1.environment.databaseUrl;
      if (databaseUrl) {
        yield mongoose_1.default.connect(databaseUrl);
        logger_1.logger.info('Connected to MongoDB');
      } else {
        logger_1.logger.warn('DATABASE_URL not provided, skipping database connection');
      }
      const server = app.listen(environment_1.environment.port, () => {
        logger_1.logger.info(
          {
            port: environment_1.environment.port,
            env: environment_1.environment.env,
            service: environment_1.environment.serviceName,
          },
          'Server started successfully'
        );
      });
      const shutdown = (signal) =>
        __awaiter(this, void 0, void 0, function* () {
          if (isShuttingDown) {
            return;
          }
          isShuttingDown = true;
          logger_1.logger.info(`${signal} received. Shutting down gracefully...`);
          try {
            yield mongoose_1.default.disconnect();
            logger_1.logger.info('Disconnected from MongoDB');
            yield new Promise((resolve) => {
              server.close(() => resolve());
            });
            logger_1.logger.info('HTTP server closed');
          } catch (error) {
            logger_1.logger.error({ error }, 'Error during shutdown');
            process.exit(1);
          }
          process.exit(0);
        });
      process.on('SIGTERM', () => shutdown('SIGTERM'));
      process.on('SIGINT', () => shutdown('SIGINT'));
    } catch (error) {
      logger_1.logger.fatal({ error }, 'Failed to start server');
      process.exit(1);
    }
  });
}
startServer();
