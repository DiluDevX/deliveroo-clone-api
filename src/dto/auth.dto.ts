import { z } from "zod";
import {
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";
import { IUser } from "../models/user.model";
import { ObjectId } from "mongodb";

export type CheckEmailRequestBodyDTO = {
  email: string;
};

export type CheckEmailResponseBodyDTO = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type LoginRequestBodyDTO = z.infer<typeof loginRequestBodySchema>;

export type LoginResponseBodyDTO = {
  token: string;
};

export type SignupRequestBodyDTO = z.infer<typeof signupRequestBodySchema>;

export type ForgotPasswordRequestBodyDTO = z.infer<
  typeof forgotPasswordRequestBodySchema
>;

export type SignupResponseBodyDTO = {
  token: string;
  user: Omit<IUser, "password">;
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
