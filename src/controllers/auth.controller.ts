import { Request, Response, NextFunction } from "express";
import authService from "../services/auth-client.service";
import { AxiosError } from "axios";

export const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.checkEmail(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.login(req.body);

    // Forward cookies from auth service to client with SameSite=Lax
    const setCookieHeader = result.headers["set-cookie"];
    if (setCookieHeader) {
      const modifiedCookies = setCookieHeader.map((cookie: string) =>
        cookie.replace(/SameSite=None/gi, "SameSite=Lax")
      );
      res.setHeader("Set-Cookie", modifiedCookies);
    }

    res.status(200).json(result.data);
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

    // Forward cookies from auth service to client with SameSite=Lax
    const setCookieHeader = result.headers["set-cookie"];
    if (setCookieHeader) {
      const modifiedCookies = setCookieHeader.map((cookie: string) =>
        cookie.replace(/SameSite=None/gi, "SameSite=Lax")
      );
      res.setHeader("Set-Cookie", modifiedCookies);
    }

    res.status(201).json(result.data);
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
    const result = await authService.forgotPassword(req.body.email);
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
      req.body.email,
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

export const checkAuthStatus = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.authStatus();
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
}