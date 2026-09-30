import rateLimit from 'express-rate-limit';
import { environment } from '../config/environment';

export const rateLimiterMiddleware = rateLimit({
  windowMs: environment.rateLimit.windowMs,
  max: environment.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
});
