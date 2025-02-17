import Restaurant from "../models/restaurant.model";
import { CreateModel } from "../types/mongoose.types";
import Users, { IUsers } from "../models/users.model";
import { RootFilterQuery, Types } from "mongoose";

const findAll = async () => {
  return Users.find();
};

const createNew = async (data: CreateModel<IUsers>) => {
  return Users.create({ ...data });
};

const findOne = async (data?: RootFilterQuery<IUsers>) => {
  return Users.findOne(data);
};

const findById = async (id: Types.ObjectId) => {
  return Users.findById(id);
};

const findByIdAndUpdate = async (id: string, data: any) => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return Restaurant.findByIdAndDelete(id, { new: true });
};

export const usersService = {
  createNew,
  findAll,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne,
};
