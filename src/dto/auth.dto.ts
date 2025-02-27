import { z } from "zod";
import {
  forgotPasswordRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";
import { IUser } from "../models/user.model";

export type CheckEmailRequestBodyDTO = {
  email: string;
};

export type CheckEmailResponseBodyDTO = {
  firstName: string;
  lastName: string;
  email: string;
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
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadDTO;
    }
  }
}
