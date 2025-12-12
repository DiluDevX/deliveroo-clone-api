import Category, { ICategory } from "../models/category.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findAll = async (filters: any, populate?: string | string[]) => {
  const query = Category.find(filters);
  if (populate) {
    if (typeof populate === "string") {
      query.populate(populate);
    } else if (Array.isArray(populate)) {
      populate.forEach((field) => query.populate(field));
    }
  }
  return query;
};

const createNew = async (
  data: Omit<ICategory, "_id" | "createdAt" | "updatedAt">,
): Promise<ICategory> => {
  const category = await Category.create(data);
  return category.toObject();
};

const findById = async (id: string) => {
  return Category.findById(id);
};

const findByIdAndUpdate = async (id: string, data: ICategory) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (id: string, data: Partial<ICategory>) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
  return Category.findByIdAndDelete(id, { new: true });
};

export const categoryService = {
  findById,
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
};
