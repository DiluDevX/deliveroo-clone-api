import { z } from "zod";
import {
  FullyUpdateCategoryRequestBodySchema,
  PartiallyUpdateCategoryRequestBodySchema,
} from "../schema/category.schema";
import { ICategory } from "../models/category.model";
export type UpdateCategoryFullyRequestBodyDTO = z.infer<
  typeof FullyUpdateCategoryRequestBodySchema
>;

export type UpdateCategoryPartiallyRequestBodyDTO = z.infer<
  typeof PartiallyUpdateCategoryRequestBodySchema
>;

export type GetAllCategoriesResponseBodyDTO = ICategory[];

export type UpdateCategoryFullyResponseBodyDTO = ICategory;

export type UpdateCategoryPartiallyResponseBodyDTO = ICategory;

export type DeleteCategoryResponseBodyDTO = ICategory;

export type GetACategoryResponseBodyDTO = ICategory;

export type GetACategoryRequestBodyDTO = ICategory;

export type CreateNewCategoryResponseBodyDTO = ICategory;

export type CreateNewCategoryRequestBodyDTO = ICategory;
