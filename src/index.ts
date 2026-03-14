import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './utils/logger';
import { environment } from './config/environment';
import { errorHandler } from './middleware/error-handler.middleware';
import { rateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import routes from './routes';

const app = express();

let isShuttingDown = false;

app.use(cors({ origin: environment.baseUrl, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(rateLimiterMiddleware);

app.use(routes);

app.use(errorHandler as ErrorRequestHandler);

async function startServer(): Promise<void> {
  try {
    const databaseUrl = environment.databaseUrl;
    if (databaseUrl) {
      await mongoose.connect(databaseUrl);
      logger.info('Connected to MongoDB');
    } else {
      logger.warn('DATABASE_URL not provided, skipping database connection');
    }

    const server = app.listen(environment.port, () => {
      logger.info(
        {
          port: environment.port,
          env: environment.env,
          service: environment.serviceName,
        },
        'Server started successfully'
      );
    });

    const shutdown = async (signal: string) => {
      if (isShuttingDown) {
        return;
      }
      isShuttingDown = true;

      logger.info(`${signal} received. Shutting down gracefully...`);

      try {
        await mongoose.disconnect();
        logger.info('Disconnected from MongoDB');

        await new Promise<void>((resolve) => {
          server.close(() => resolve());
        });
        logger.info('HTTP server closed');
      } catch (error) {
        logger.error({ error }, 'Error during shutdown');
        process.exit(1);
      }

      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.fatal({ error }, 'Failed to start server');
    process.exit(1);
  }
}

startServer();
