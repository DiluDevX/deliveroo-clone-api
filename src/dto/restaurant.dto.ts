import { z } from "zod";
import {
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";
import { IRestaurant } from "../models/restaurant.model";

export type UpdateRestaurantFullyRequestBodyDTO = z.infer<
  typeof updateRestaurantFullyRequestBodySchema
>;

export type UpdateRestaurantPartiallyRequestBodyDTO = z.infer<
  typeof updateRestaurantPartiallyRequestBodySchema
>;

export type GetAllRestaurantsResponseBodyDTO = IRestaurant[];

export type UpdateRestaurantFullyResponseBodyDTO = IRestaurant;

export type UpdateRestaurantPartiallyResponseBodyDTO = IRestaurant;

export type DeleteRestaurantResponseBodyDTO = IRestaurant;

export type GetARestaurantResponseBodyDTO = IRestaurant;

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

export type CreateNewRestaurantResponseBodyDTO = {
  name: string;
  image: string;
  description?: string;
  tags: string[];
  openingAt: string;
  closingAt: string;
  minimumValue: string;
  deliveryCharge: string;
};
