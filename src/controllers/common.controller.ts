import { Request, Response } from 'express';
import { environment } from '../config/environment';

export const healthCheck = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    data: {
      service: environment.serviceName,
      version: environment.version,
      env: environment.env,
    },
  });
};

export const fallback = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
};
