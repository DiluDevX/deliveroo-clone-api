// src/services/category.service.ts
import { Types } from "mongoose";
import { z } from "zod";
import Category, { ICategory } from "../models/category.model";
import { CreateCategoryRequestBodySchema } from "../schema/category.schema";

// Derive types from Zod schemas (Single Source of Truth)
type CreateCategoryInput = z.infer<typeof CreateCategoryRequestBodySchema>;
type UpdateCategoryInput = CreateCategoryInput;
type PartialUpdateCategoryInput = Partial<CreateCategoryInput>;

// Transform function for ObjectId conversion
const toDbDocument = (data: CreateCategoryInput) => ({
  ...data,
  restaurant: new Types.ObjectId(data.restaurant),
});

const toPartialDbDocument = (data: PartialUpdateCategoryInput) => {
  const result: Record<string, unknown> = { ...data };

  if (data.restaurant) {
    result.restaurant = new Types.ObjectId(data.restaurant);
  }

  return result;
};

// Service methods
const findAll = async (
  filters: Partial<{ restaurant: string }>,
  populate?: string | string[],
) => {
  const query = Category.find(filters);

  if (populate) {
    const fields = Array.isArray(populate) ? populate : [populate];
    fields.forEach((field) => query.populate(field));
  }

  return query;
};

const createNew = async (data: CreateCategoryInput): Promise<ICategory> => {
  const category = await Category.create(toDbDocument(data));
  return category.toObject();
};

const findById = async (id: string) => {
  return Category.findById(id);
};

const findByIdAndUpdate = async (id: string, data: UpdateCategoryInput) => {
  return Category.findByIdAndUpdate(id, toDbDocument(data), { new: true });
};

const findAndUpdatePartially = async (
  id: string,
  data: PartialUpdateCategoryInput,
) => {
  return Category.findByIdAndUpdate(id, toPartialDbDocument(data), {
    new: true,
  });
};

const findByIdAndDelete = async (id: string) => {
  return Category.findByIdAndDelete(id);
};

export const categoryService = {
  findById,
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
};
