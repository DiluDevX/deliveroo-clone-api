import { z } from "zod";
import { Request } from "express";
import {
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
  checkEmailRequestBodySchema,
  logoutRequestBodySchema,
} from "../schema/auth.schema";
import { ObjectId } from "mongodb";
import { IUser } from "../types/user.type";

export type CheckEmailRequestBodyDTO = z.infer<
  typeof checkEmailRequestBodySchema
>;

export type CheckEmailResponseBodyDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

export type LoginRequestBodyDTO = z.infer<typeof loginRequestBodySchema>;

export type LoginResponseBodyDTO = {
  accessToken: string;
  refreshToken: string;
};

export type SignupRequestBodyDTO = z.infer<typeof signupRequestBodySchema>;

export type SignupResponseBodyDTO = {
  user: Omit<IUser, "password">;
};

export type LogoutRequestBodyDTO = z.infer<typeof logoutRequestBodySchema>;

export interface AuthenticatedUserRequest extends Request {
  user?: JwtPayloadDTO;
}

export type ForgotPasswordRequestBodyDTO = z.infer<
  typeof forgotPasswordRequestBodySchema
>;

export type ForgotPasswordResponseBodyDTO = {
  message: string;
};

export type ResetPasswordResponseBodyDTO = {
  message: string;
};

export type RefreshTokenResponseBodyDTO = {
  accessToken: string;
  refreshToken: string;
};

export interface JwtPayloadDTO {
  firstName: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayloadDTO;
  }
}

export type ValidateResetPasswordTokenRequestBodySchemaDTO = {
  token: string;
};

export type ValidateResetPasswordTokenResponseBodySchemaDTO = {
  email: string;
  user_id: ObjectId;
};

export type ResetPasswordResponseBodySchemaDTO = {
  email: string;
  user_id: ObjectId;
};
