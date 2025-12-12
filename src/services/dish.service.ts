import { z } from "zod";
import { Types } from "mongoose";
import Dish from "../models/dish.model";
import {
  CreateDishRequestBodySchema,
  PartiallyUpdateDishRequestBodySchema,
  DishQueryParamsSchema,
} from "../schema/dish.schema";

type CreateDishInput = z.infer<typeof CreateDishRequestBodySchema>;
type UpdateDishInput = CreateDishInput;
type PartialUpdateDishInput = z.infer<
  typeof PartiallyUpdateDishRequestBodySchema
>;
type DishFilters = z.infer<typeof DishQueryParamsSchema>;

// Transform functions for ObjectId conversion
const toDbDocument = (data: CreateDishInput) => ({
  ...data,
  category: new Types.ObjectId(data.category),
  restaurant: new Types.ObjectId(data.restaurant),
});

const toPartialDbDocument = (data: PartialUpdateDishInput) => {
  const result: Record<string, unknown> = { ...data };

  if (data.category) {
    result.category = new Types.ObjectId(data.category);
  }

  if (data.restaurant) {
    result.restaurant = new Types.ObjectId(data.restaurant);
  }

  return result;
};

// Service methods
const findAll = async (
  filters: Partial<Pick<DishFilters, "restaurant" | "category">>,
  populate?: string | string[],
) => {
  const query = Dish.find(filters);

  if (populate) {
    const fields = Array.isArray(populate) ? populate : populate.split(" ");
    fields.forEach((field) => query.populate(field));
  }

  return query;
};

const createNew = async (data: CreateDishInput) => {
  return Dish.create(toDbDocument(data));
};

const findById = async (id: string) => {
  return Dish.findById(id);
};

const findByIdAndUpdate = async (id: string, data: UpdateDishInput) => {
  return Dish.findByIdAndUpdate(id, toDbDocument(data), { new: true });
};

const findAndUpdatePartially = async (
  id: string,
  data: PartialUpdateDishInput,
) => {
  return Dish.findByIdAndUpdate(id, toPartialDbDocument(data), { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return Dish.findByIdAndDelete(id);
};

export const dishService = {
  findById,
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
};
