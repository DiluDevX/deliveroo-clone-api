import Dish, { IDish } from "../models/dish.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findAll = async (filters: any, populate?: string | string[]) => {
  const query = Dish.find(filters);
  if (populate === "category") {
    query.populate("category");
  } else if (populate === "restaurant") {
    query.populate("restaurant");
  } else if (populate === "category restaurant") {
    query.populate("category").populate("restaurant");
  }
  return query;
};

const createNew = async (data: IDish) => {
  return Dish.create(data);
};

const findById = async (id: string) => {
  return Dish.findById(id);
};

const findByIdAndUpdate = async (id: string, data: IDish) => {
  return Dish.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (id: string, data: Partial<IDish>) => {
  return Dish.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return Dish.findByIdAndDelete(id, { new: true });
};

export const dishService = {
  findById,
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
};
