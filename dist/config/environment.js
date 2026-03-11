'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require('dotenv'));
const constants_1 = require('../utils/constants');
dotenv_1.default.config();
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
function optionalEnv(name, defaultValue) {
  return process.env[name] || defaultValue;
}
const parsePositiveInt = (raw, name) => {
  const value = Number(raw);
  if (Number.isNaN(value) || value <= 0) {
    throw new Error(`Invalid ${name} value: ${value}. Must be a positive integer.`);
  }
  return value;
};
const loadRateLimitConfig = (env) => {
  const defaults = {
    [constants_1.EnvironmentEnum.Production]: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    [constants_1.EnvironmentEnum.Development]: {
      windowMs: 15 * 60 * 1000,
      max: 1000,
    },
    [constants_1.EnvironmentEnum.Test]: {
      windowMs: 1 * 60 * 1000,
      max: 10000,
    },
  };
  const envDefaults = defaults[env];
  return {
    windowMs: parsePositiveInt(
      optionalEnv('RATE_LIMIT_WINDOW_MS', envDefaults.windowMs.toString()),
      'RATE_LIMIT_WINDOW_MS'
    ),
    max: parsePositiveInt(
      optionalEnv('RATE_LIMIT_MAX', envDefaults.max.toString()),
      'RATE_LIMIT_MAX'
    ),
  };
};
const rawEnv = optionalEnv('NODE_ENV', 'development');
const validEnvs = Object.values(constants_1.EnvironmentEnum);
if (!validEnvs.includes(rawEnv)) {
  throw new Error(`Invalid NODE_ENV value: ${rawEnv}. Must be one of ${validEnvs.join(', ')}`);
}
const environmentRaw = rawEnv;
exports.environment = {
  port: parsePositiveInt(optionalEnv('PORT', '3000'), 'PORT'),
  env: environmentRaw,
  version: optionalEnv('APP_VERSION', '1.0.0'),
  databaseUrl: optionalEnv('DATABASE_URL', ''),
  baseUrl: optionalEnv('BASE_URL', 'http://localhost:3000'),
  logging: {
    level: optionalEnv('LOG_LEVEL', 'info'),
  },
  bffAPIKey: requireEnv('BFF_API_KEY'),
  serviceName: requireEnv('SERVICE_NAME'),
  authService: {
    url: optionalEnv('AUTH_SERVICE_URL', 'http://localhost:4001'),
    apiKey: optionalEnv('AUTH_API_KEY', ''),
  },
  orderService: {
    url: optionalEnv('ORDER_SERVICE_URL', 'http://localhost:4002'),
    apiKey: optionalEnv('ORDER_SERVICE_API_KEY', ''),
  },
  paymentService: {
    url: optionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:4003'),
    apiKey: optionalEnv('PAYMENT_SERVICE_API_KEY', ''),
  },
  rateLimit: loadRateLimitConfig(environmentRaw),
};
