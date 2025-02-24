import { z } from "zod";
import {
  FullyUpdateCategoryRequestBodySchema,
  PartiallyUpdateCategoryRequestBodySchema,
} from "../schema/category.schema";

export type CreateNewCategoryRequestBodyDTO = {
  name: string;
  restaurant: string;
};

export type UpdateCategoryFullyRequestBodyDTO = z.infer<
  typeof FullyUpdateCategoryRequestBodySchema
>;

export type UpdateCategoryPartiallyRequestBodyDTO = z.infer<
  typeof PartiallyUpdateCategoryRequestBodySchema
>;

export type CategoryResponseDTO = {
  id: string;
  name: string;
  restaurant: string;
};

export type GetAllCategoriesResponseBodyDTO = CategoryResponseDTO[];
export type UpdateCategoryFullyResponseBodyDTO = CategoryResponseDTO;
export type UpdateCategoryPartiallyResponseBodyDTO = CategoryResponseDTO;
export type DeleteCategoryResponseBodyDTO = CategoryResponseDTO;
export type GetACategoryResponseBodyDTO = CategoryResponseDTO;
export type CreateNewCategoryResponseBodyDTO = CategoryResponseDTO;
