import { CreateModel } from "../types/mongoose.types";
import User, { IUser } from "../models/user.model";
import { RootFilterQuery } from "mongoose";

const findAll = async () => {
  return User.find();
};

const createNew = async (data: CreateModel<IUser>) => {
  return User.create({ ...data });
};

const findOne = async (data?: RootFilterQuery<IUser>) => {
  return User.findOne(data);
};

const findById = async (id: string) => {
  return User.findById(id);
};

const findByIdAndUpdate = async (id: string, data: any) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return User.findByIdAndDelete(id, { new: true });
};

export const usersService = {
  createNew,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne,
  findById,
};
