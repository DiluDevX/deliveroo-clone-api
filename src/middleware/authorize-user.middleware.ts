import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedUserRequest } from "../dto/auth.dto";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const authorizeUser = (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as { role: string };

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Access denied. Invalid token" });
  }
};
