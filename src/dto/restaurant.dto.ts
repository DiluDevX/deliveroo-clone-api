import { z } from "zod";
import {
  createRestaurantRequestBodySchema,
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";
import { IOperatingHours } from "../models/restaurant.model";

export type CreateNewRestaurantRequestBodyDTO = z.infer<
  typeof createRestaurantRequestBodySchema
>;

export type UpdateRestaurantFullyRequestBodyDTO = z.infer<
  typeof updateRestaurantFullyRequestBodySchema
>;

export type UpdateRestaurantPartiallyRequestBodyDTO = z.infer<
  typeof updateRestaurantPartiallyRequestBodySchema
>;

export type RestaurantResponseDTO = {
  id: string;
  name: string;
  image: string;
  description?: string;
  tags: string[];
  minimumValue: string;
  deliveryCharge: string;
  cuisine: string;
  rating: number;
  operatingHours: IOperatingHours[];
  status: "active" | "disabled";
  commissionPercentage?: number;
};

export type GetAllRestaurantsResponseBodyDTO = RestaurantResponseDTO[];
export type UpdateRestaurantFullyResponseBodyDTO = RestaurantResponseDTO;
export type UpdateRestaurantPartiallyResponseBodyDTO = RestaurantResponseDTO;
export type DeleteRestaurantResponseBodyDTO = RestaurantResponseDTO;
export type GetARestaurantResponseBodyDTO = RestaurantResponseDTO;
export type CreateNewRestaurantResponseBodyDTO = RestaurantResponseDTO;
