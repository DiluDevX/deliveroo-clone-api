import { Request, Response, NextFunction } from "express";
import authService from "../services/auth-client.service";
import { AxiosError } from "axios";

/*export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Keep this local for now, or add to auth microservice later
    const { email } = req.body;
    // You can call auth service or keep using local DB
    res.status(200).json({ exists: false }); // TODO: implement in microservice
  } catch (error) {
    next(error);
  }
};
*/

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.forgotPassword(req.body.userName);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const validateResetPasswordToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.verifyToken(req.body.token);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.resetPassword(
      req.body.token,
      req.body.password,
    );
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};
