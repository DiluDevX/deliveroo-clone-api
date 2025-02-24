import { z } from "zod";
import {
  updateUserFullyRequestBodySchema,
  updateUserPartiallyRequestBodySchema,
} from "../schema/users.schema";
import { IUser } from "../models/user.model";

// Request DTOs
export type UpdateUserFullyRequestBodyDTO = z.infer<
  typeof updateUserFullyRequestBodySchema
>;
export type UpdateUserPartiallyRequestBodyDTO = z.infer<
  typeof updateUserPartiallyRequestBodySchema
>;

// Response Types
export type GetAllUsersResponseBodyDTO = IUser[];
export type GetAnUserResponseBodyDTO = IUser;
export type UpdateUserFullyResponseBodyDTO = IUser;
export type UpdateUserPartiallyResponseBodyDTO = IUser;
export type DeleteUserResponseBodyDTO = IUser;
