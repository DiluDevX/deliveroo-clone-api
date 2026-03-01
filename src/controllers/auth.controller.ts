import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.micro.service";
import { AxiosError, HttpStatusCode } from "axios";
import {
  CheckEmailRequestBodyDTO,
  CheckEmailResponseBodyDTO,
  ForgotPasswordRequestBodyDTO,
  ForgotPasswordResponseBodyDTO,
  LoginRequestBodyDTO,
  LoginResponseBodyDTO,
  LogoutRequestBodyDTO,
  SignupRequestBodyDTO,
  SignupResponseBodyDTO,
  ValidateResetPasswordTokenRequestBodyDTO,
  ResetPasswordRequestBodyDTO,
} from "../dto/auth.dto";
import { CommonResponseDTO } from "../dto/common.dto";

export const checkEmail = async (
  req: Request<unknown, CheckEmailResponseBodyDTO, CheckEmailRequestBodyDTO>,
  res: Response<CommonResponseDTO<CheckEmailResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Auth.checkEmail(req.body.email);
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const signup = async (
  req: Request<unknown, SignupResponseBodyDTO, SignupRequestBodyDTO>,
  res: Response<CommonResponseDTO<SignupResponseBodyDTO | null>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Auth.signup(req.body);

    res.status(HttpStatusCode.Created).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const login = async (
  req: Request<unknown, LoginResponseBodyDTO, LoginRequestBodyDTO>,
  res: Response<CommonResponseDTO<LoginResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Auth.login(req.body);

    if (result.data) {
      const { accessToken, refreshToken } = result.data;
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
    }

    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const logOut = async (
  req: Request<unknown, CommonResponseDTO<null>, LogoutRequestBodyDTO>,
  res: Response<CommonResponseDTO<null>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await authService.Auth.logOut(req.body);

    res.status(HttpStatusCode.Ok).json(response);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const forgotPassword = async (
  req: Request<
    unknown,
    ForgotPasswordResponseBodyDTO,
    ForgotPasswordRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<ForgotPasswordResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Auth.forgotPassword(req.body.email);
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const verifyResetPasswordToken = async (
  req: Request<unknown, never, ValidateResetPasswordTokenRequestBodyDTO>,
  res: Response<CommonResponseDTO<never>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await authService.Auth.verifyResetToken(req.body.token);
    res
      .status(HttpStatusCode.Ok)
      .json({ success: true, message: "Token is valid" });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const resetPassword = async (
  req: Request<unknown, never, ResetPasswordRequestBodyDTO>,
  res: Response<CommonResponseDTO<never>>,
  next: NextFunction,
): Promise<void> => {
  try {
    await authService.Auth.resetPassword(req.body.token, req.body.password);
    res
      .status(HttpStatusCode.Ok)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const refreshToken = async (
  req: Request<unknown, CommonResponseDTO<LoginResponseBodyDTO>, never>,
  res: Response<CommonResponseDTO<LoginResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.headers["x-refresh-token"] as string;
    const result = await authService.Auth.refresh(token);

    if (result.data) {
      const { accessToken, refreshToken } = result.data;
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.setHeader("X-Refresh-Token", refreshToken);
    }

    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};
