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
        cookie.replace(/SameSite=None/gi, "SameSite=Lax"),
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
    // Pass the refresh token from the cookie
    const result = await authService.refresh(req.cookies.refreshToken);
    res.status(200).json(result.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const checkAuthStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.authStatus(req.cookies.accessToken);
    res.status(200).json(result.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await authService.logOut(req.cookies.refreshToken);
    if (response.status !== 200) {
      return res.status(response.status).json(response.data);
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};
