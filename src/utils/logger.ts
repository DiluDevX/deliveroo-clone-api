import pino from 'pino';
import { environment } from '../config/environment';

const loggerOptions: pino.LoggerOptions = {
  level: environment.logging.level,
  base: {
    service: environment.serviceName,
    env: environment.env,
  },
};

if (environment.env === 'development') {
  try {
    require.resolve('pino-pretty');
    loggerOptions.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    };
  } catch {
    // pino-pretty is a development-only dependency.
  }
}

export const logger = pino(loggerOptions);
