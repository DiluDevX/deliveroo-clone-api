import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const AuthorizeRestaurantAdmin = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const reqRole = req.headers.restaurant_admin;
    if (!reqRole) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }
    next();
  };
};

export const AuthorizePlatformAdmin = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const reqRole = req.headers.platform_admin;
    if (!reqRole) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }
    next();
  };
};
