import { z } from "zod";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Restaurant, { IRestaurant } from "../models/restaurant.model";
import {
  createRestaurantRequestBodySchema,
  updateRestaurantFullyRequestBodySchema,
  updateRestaurantPartiallyRequestBodySchema,
} from "../schema/restaurant.schema";

// Derive types from Zod schemas (Single Source of Truth)
type CreateRestaurantInput = z.infer<typeof createRestaurantRequestBodySchema>;
type UpdateRestaurantInput = z.infer<
  typeof updateRestaurantFullyRequestBodySchema
>;
type PartialUpdateRestaurantInput = z.infer<
  typeof updateRestaurantPartiallyRequestBodySchema
>;
const findAll = async (): Promise<IRestaurant[]> => {
  return Restaurant.find();
};

const createNew = async (data: CreateRestaurantInput): Promise<IRestaurant> => {
  return Restaurant.create({ ...data, orgId: uuidv4() });
};

const findOne = async (restaurantID: string): Promise<IRestaurant | null> => {
  const input = mongoose.Types.ObjectId.isValid(restaurantID)
    ? { _id: restaurantID }
    : { name: restaurantID };
  return Restaurant.findOne(input);
};

const findByIdAndUpdate = async (
  id: string,
  data: UpdateRestaurantInput,
): Promise<IRestaurant | null> => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (
  id: string,
  data: PartialUpdateRestaurantInput,
): Promise<IRestaurant | null> => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (
  id: string,
): Promise<IRestaurant | null> => {
  return Restaurant.findByIdAndDelete(id);
};

export const restaurantService = {
  findOne,
  createNew,
  findAll,
  findByIdAndUpdate,
  findAndUpdatePartially,
  findByIdAndDelete,
};
