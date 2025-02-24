import { z } from "zod";
import {
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";

export type CreateNewRestaurantRequestBodyDTO = {
  name: string;
  image: string;
  description?: string;
  tags: string[];
  openingAt: string;
  closingAt: string;
  minimumValue: string;
  deliveryCharge: string;
};

export type UpdateRestaurantFullyRequestBodyDTO = z.infer<
  typeof updateRestaurantFullyRequestBodySchema
>;

export type UpdateRestaurantPartiallyRequestBodyDTO = z.infer<
  typeof updateRestaurantPartiallyRequestBodySchema
>;

export type RestaurantResponseDTO = {
  id: string;
  orgId: string;
  name: string;
  image: string;
  description?: string;
  tags: string[];
  openingAt: string;
  closingAt: string;
  minimumValue: string;
  deliveryCharge: string;
};

export type GetAllRestaurantsResponseBodyDTO = RestaurantResponseDTO[];
export type UpdateRestaurantFullyResponseBodyDTO = RestaurantResponseDTO;
export type UpdateRestaurantPartiallyResponseBodyDTO = RestaurantResponseDTO;
export type DeleteRestaurantResponseBodyDTO = RestaurantResponseDTO;
export type GetARestaurantResponseBodyDTO = RestaurantResponseDTO;
export type CreateNewRestaurantResponseBodyDTO = RestaurantResponseDTO;
