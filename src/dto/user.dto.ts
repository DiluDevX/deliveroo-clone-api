import { z } from "zod";
import {
  createUserRequestBodySchema,
  userUpdatePartiallyRequestBodySchema,
  userUpdatePartiallyRequestParamsSchema,
  deleteUserRequestParamsSchema,
  getUserRequestParamsSchema,
} from "../schema/users.schema";

export type GetAllUsersResponseBodyDTO = {
  users: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    role: string;
  }>;
};

export type GetSingleUserRequestParamsDTO = z.infer<
  typeof getUserRequestParamsSchema
>;

export type GetSingleUserResponseBodyDTO = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type CreateUserRequestBodyDTO = z.infer<
  typeof createUserRequestBodySchema
>;

export type CreateUserResponseBodyDTO = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    role: string;
  };
  message: string;
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
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    role: string;
  };
  message: string;
};

export type DeleteUserRequestParamsDTO = z.infer<
  typeof deleteUserRequestParamsSchema
>;

export type DeleteUserResponseBodyDTO = {
  message: string;
};
