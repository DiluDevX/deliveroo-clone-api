import { z } from "zod";
import { RootFilterQuery } from "mongoose";
import User, { IUser } from "../models/user.model";
import {
  updateUserFullyRequestBodySchema,
  updateUserPartiallyRequestBodySchema,
} from "../schema/users.schema";

// Derive types from Zod schemas (Single Source of Truth)
type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: "admin" | "user";
};
type UpdateUserInput = z.infer<typeof updateUserFullyRequestBodySchema>;
type PartialUpdateUserInput = z.infer<
  typeof updateUserPartiallyRequestBodySchema
>;

// Service methods
const findAll = async () => {
  return User.find();
};

const createNew = async (data: CreateUserInput) => {
  return User.create(data);
};

const findOne = async (data?: RootFilterQuery<IUser>) => {
  return User.findOne(data);
};

const findById = async (id: string) => {
  return User.findById(id);
};

const findByIdAndUpdate = async (id: string, data: UpdateUserInput) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (
  id: string,
  data: PartialUpdateUserInput,
) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return User.findByIdAndDelete(id);
};

export const usersService = {
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
  findOne,
  findById,
};
