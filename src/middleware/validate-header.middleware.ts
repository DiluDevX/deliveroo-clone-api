import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

interface HeaderRequest extends Request {
  headerData?: Record<string, any>;
}

const ValidateHeader =
  (headerSchema: ZodSchema, headerName: string = "authorization") =>
  (req: HeaderRequest, res: Response, next: NextFunction) => {
    try {
      const headerValue = req.headers[headerName];

      if (!headerValue) {
        res.status(400).json({
          message: "Validation Error",
          errors: `Missing required header: ${headerName}`,
        });
        return;
      }

      // Parse and validate the header value against schema
      const validatedData = headerSchema.parse({ token: headerValue });
      req.headerData = validatedData;

      next();
    } catch (error) {
      res.status(400).json({
        message: "Validation Error",
        errors: error,
      });
    }
  };

export default ValidateHeader;
