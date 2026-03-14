import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const ValidateBody =
  (bodySchema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      bodySchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        message: 'Validation Error',
        errors: error,
      });
    }
  };

export default ValidateBody;
