import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../dto/auth.dto";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      res.status(401).json({ error: "Access denied. No token provided." });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
      req.user = decodedToken;

      if (req.user.role !== role) {
        res.status(403).json({ message: "Access denied. Insufficient role." });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Access denied. Invalid token." });
      return;
    }
  };
};

export const optionalAuthorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      next();
      return;
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
      req.user = decodedToken;

      if (req.user.role !== role) {
        res.status(403).json({ message: "Access denied. Insufficient role." });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Access denied. Invalid token." });
      return;
    }
  };
};
