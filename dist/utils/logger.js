'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require('pino'));
const environment_1 = require('../config/environment');
exports.logger = (0, pino_1.default)({
  level: environment_1.environment.logging.level,
  base: {
    service: environment_1.environment.serviceName,
    env: environment_1.environment.env,
  },
  transport:
    environment_1.environment.env === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
});
