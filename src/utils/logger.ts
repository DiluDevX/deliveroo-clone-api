import pino from 'pino';
import { environment } from '../config/environment';

export const logger = pino({
  level: environment.logging.level,
  base: {
    service: environment.serviceName,
    env: environment.env,
  },
  transport:
    environment.env === 'development'
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
