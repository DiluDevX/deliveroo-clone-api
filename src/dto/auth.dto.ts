import { z } from "zod";
import { updateUserPartiallyRequestBodySchema } from "../schema/users.schema";
import {
  checkEmailRequestBodySchema,
  loginRequestBodySchema,
  signupRequestBodySchema,
} from "../schema/auth.schema";
import { IUser } from "../models/user.model";

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
  token: string;
};

export type SignupRequestBodyDTO = z.infer<typeof signupRequestBodySchema>;

export type SignupResponseBodyDTO = {
  token: string;
  user: Omit<IUser, "password">;
};

export interface JwtPayload {
  firstName: string;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
