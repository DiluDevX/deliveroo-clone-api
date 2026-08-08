import dotenv from 'dotenv';
import { EnvironmentEnum } from '../utils/constants';
dotenv.config();

interface MicroserviceConfig {
  url: string;
  apiKey: string;
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface Environment {
  port: number;
  env: EnvironmentEnum;
  databaseUrl: string;
  baseUrl: string;
  version: string;
  logging: {
    level: string;
  };
  bffAPIKey: string;
  serviceName: string;
  authService: MicroserviceConfig;
  orderService: MicroserviceConfig;
  paymentService: MicroserviceConfig;
  restaurantService: MicroserviceConfig;
  rateLimit: RateLimitConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

const parsePositiveInt = (raw: string, name: string): number => {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Invalid ${name} value: ${value}. Must be a positive integer.`);
  }
  return value;
};

const loadRateLimitConfig = (env: EnvironmentEnum): RateLimitConfig => {
  const defaults = {
    [EnvironmentEnum.Production]: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    [EnvironmentEnum.Development]: {
      windowMs: 15 * 60 * 1000,
      max: 1000,
    },
    [EnvironmentEnum.Test]: {
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
const validEnvs = Object.values(EnvironmentEnum);
if (!validEnvs.includes(rawEnv as EnvironmentEnum)) {
  throw new Error(`Invalid NODE_ENV value: ${rawEnv}. Must be one of ${validEnvs.join(', ')}`);
}

const environmentRaw = rawEnv as EnvironmentEnum;

export const environment: Environment = {
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
    apiKey: requireEnv('AUTH_API_KEY'),
  },
  orderService: {
    url: optionalEnv('ORDER_SERVICE_URL', 'http://localhost:4002'),
    apiKey: requireEnv('ORDER_SERVICE_API_KEY'),
  },
  paymentService: {
    url: optionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:4003'),
    apiKey: requireEnv('PAYMENT_SERVICE_API_KEY'),
  },
  restaurantService: {
    url: optionalEnv('RESTAURANT_SERVICE_URL', 'http://localhost:4004'),
    apiKey: requireEnv('RESTAURANT_SERVICE_API_KEY'),
  },
  rateLimit: loadRateLimitConfig(environmentRaw),
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expiresIn: requireEnv('JWT_EXPIRES_IN'),
  },
};
