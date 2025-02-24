import Dish from "../models/dish.model";

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

const createNew = async (data: any) => {
  return await Dish.create(data);
};

const findById = async (id: string) => {
  return Dish.findById(id);
};

const findByIdAndUpdate = async (id: string, data: any) => {
  return Dish.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (id: string, data: any) => {
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
