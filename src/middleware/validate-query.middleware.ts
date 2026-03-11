import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const ValidateQuery =
  (querySchema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      querySchema.parse(req.query);
      next();
    } catch (error) {
      res.status(400).json({
        message: 'Validation Error',
        errors: error,
      });
    }
  };

export default ValidateQuery;
