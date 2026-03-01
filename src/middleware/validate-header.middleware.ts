import { HttpStatusCode } from "axios";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const ValidateHeader =
  (headerSchema: ZodSchema, headerName: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let headerValue = req.headers[headerName] as string;

      if (!headerValue) {
        res.status(HttpStatusCode.NotFound).json({
          message: "Validation Error",
          errors: `Missing required header: ${headerName}`,
        });
        return;
      }
      if (headerValue.startsWith("Bearer ")) {
        headerValue = headerValue.replace("Bearer ", "");
      }
      headerSchema.parse({ headerValue });
      next();
    } catch (error) {
      res.status(HttpStatusCode.BadRequest).json({
        message: "Validation Error",
        errors: error,
      });
    }
  };

export default ValidateHeader;
