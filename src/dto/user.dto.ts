import { z } from "zod";
import {
  createUserRequestBodySchema,
  userUpdatePartiallyRequestBodySchema,
  userUpdatePartiallyRequestParamsSchema,
  deleteUserRequestParamsSchema,
  getUserRequestParamsSchema,
} from "../schema/users.schema";

export type GetAllUsersResponseBodyDTO = Array<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}>;

export type GetSingleUserRequestParamsDTO = z.infer<
  typeof getUserRequestParamsSchema
>;

export type GetSingleUserResponseBodyDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequestBodyDTO = z.infer<
  typeof createUserRequestBodySchema
>;

export type CreateUserResponseBodyDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserRequestParamsDTO = z.infer<
  typeof userUpdatePartiallyRequestParamsSchema
>;

export type UpdateUserRequestBodyDTO = z.infer<
  typeof userUpdatePartiallyRequestBodySchema
> & {
  id?: string;
};

export type UpdateUserResponseBodyDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserRequestParamsDTO = z.infer<
  typeof deleteUserRequestParamsSchema
>;

export type DeleteUserResponseBodyDTO = Record<string, never>;
