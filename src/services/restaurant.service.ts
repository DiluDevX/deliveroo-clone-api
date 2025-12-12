import { z } from "zod";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Restaurant from "../models/restaurant.model";
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

// Service methods
const findAll = async () => {
  return Restaurant.find();
};

const createNew = async (data: CreateRestaurantInput) => {
  return Restaurant.create({ ...data, orgId: uuidv4() });
};

const findOne = async (orgID: string) => {
  const input = mongoose.Types.ObjectId.isValid(orgID)
    ? { _id: orgID }
    : { name: orgID };
  return Restaurant.findOne(input);
};

const findByIdAndUpdate = async (id: string, data: UpdateRestaurantInput) => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const findAndUpdatePartially = async (
  id: string,
  data: PartialUpdateRestaurantInput,
) => {
  return Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const findByIdAndDelete = async (id: string) => {
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
