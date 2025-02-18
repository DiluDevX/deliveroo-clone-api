import { z } from "zod";
import {
  DishQueryParamsSchema,
  FullyUpdateDishRequestBodySchema,
  PartiallyUpdateDishRequestBodySchema,
} from "../schema/dish.schema";
import { IDish } from "../models/dish.model";
export type UpdateDishFullyRequestBodyDTO = z.infer<
  typeof FullyUpdateDishRequestBodySchema
>;

export type UpdateDishPartiallyRequestBodyDTO = z.infer<
  typeof PartiallyUpdateDishRequestBodySchema
>;

export type GetAllDishesResponseBodyDTO = IDish[];

export type UpdateDishFullyResponseBodyDTO = IDish;

export type UpdateDishPartiallyResponseBodyDTO = IDish;

export type DeleteDishResponseBodyDTO = IDish;

export type GetADishResponseBodyDTO = IDish;

export type GetADishRequestBodyDTO = IDish;

export type CreateNewDishResponseBodyDTO = IDish;

export type GetAllDishedRequestQueryDTO = z.infer<typeof DishQueryParamsSchema>;
