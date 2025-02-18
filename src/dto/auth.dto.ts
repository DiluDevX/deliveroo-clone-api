import { z } from "zod";
import {
  createUserRequestBodySchema,
  updateUserPartiallyRequestBodySchema,
} from "../schema/users.schema";

export type CheckEmailRequestBody = z.infer<
  typeof updateUserPartiallyRequestBodySchema
>;

export type CheckEmailResponseBody = {
  message: string;
};

export type LoginUserRequestBody = z.infer<typeof createUserRequestBodySchema>;

export type LoginUserResponseBody = {
  message: string;
  token: string;
};

export type CreateNewUserRequestBody = z.infer<
  typeof createUserRequestBodySchema
>;

export type CreateNewUserResponseBody = z.infer<
  typeof createUserRequestBodySchema
>;
