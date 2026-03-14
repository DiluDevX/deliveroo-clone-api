import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const ValidateParams =
  (paramsSchema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      paramsSchema.parse(req.params);
      next();
    } catch (error) {
      res.status(400).json({
        message: 'Validation Error',
        errors: error,
      });
    }
  };

export default ValidateParams;
