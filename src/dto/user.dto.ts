import { z } from "zod";
import {
  updateUserFullyRequestBodySchema,
  updateUserPartiallyRequestBodySchema,
} from "../schema/users.schema";

export type UpdateUserFullyRequestBodyDTO = z.infer<
  typeof updateUserFullyRequestBodySchema
>;
export type UpdateUserPartiallyRequestBodyDTO = z.infer<
  typeof updateUserPartiallyRequestBodySchema
>;

export type UserResponseDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  status: "Active" | "Suspended";
  orderCount: number;
};

export type FindAndUpdateUserPasswordRequestBodyDTO = {
  password: string;
};

export type FindAndUpdateUserPasswordResponseBodyDTO = UserResponseDTO;

export type GetAllUsersResponseBodyDTO = UserResponseDTO[];
export type GetAnUserResponseBodyDTO = UserResponseDTO;
export type UpdateUserFullyResponseBodyDTO = UserResponseDTO;
export type UpdateUserPartiallyResponseBodyDTO = UserResponseDTO;
export type DeleteUserResponseBodyDTO = UserResponseDTO;
