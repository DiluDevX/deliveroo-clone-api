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
} from "../dto/auth.dto";
import { CommonResponseDTO } from "../dto/common.dto";

export const checkEmail = async (
  req: Request<unknown, CheckEmailResponseBodyDTO, CheckEmailRequestBodyDTO>,
  res: Response<CommonResponseDTO<CheckEmailResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.checkEmail(req.body.email);
    res.status(HttpStatusCode.Ok).json(result);
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
    const result = await authService.login(req.body);

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
    const result = await authService.signup(req.body);

    res.status(HttpStatusCode.Created).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const updateUserPartially = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const updateData = req.body;
  if (Object.keys(updateData).length === 0) {
    res
      .status(400)
      .json({ message: "At least one field is required to update" });
    return;
  }
  try {
    const result = await authService.updatePartially(userId, updateData.data);
    res.status(200).json(result.data);
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
): Promise<void> => {
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
  req: Request & { headerData?: { token: string } },
  res: Response<CommonResponseDTO<LoginResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const token: string = req.headerData?.token || req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }
    const result = await authService.refresh(token);
    const setCookieHeader = result.headers["set-cookie"];
    if (setCookieHeader) {
      const modifiedCookies = setCookieHeader.map((cookie: string) =>
        cookie.replace(/SameSite=None/gi, "SameSite=Lax"),
      );
      res.setHeader("set-cookie", modifiedCookies);
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

export const checkAuthStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.cookies.accessToken === undefined) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
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
  req: Request<unknown, CommonResponseDTO<null>, LogoutRequestBodyDTO>,
  res: Response<CommonResponseDTO<null>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await authService.logOut(req.body);

    res.status(HttpStatusCode.Ok).json(response);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};
