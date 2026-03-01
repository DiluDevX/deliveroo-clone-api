import { z } from "zod";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import { restaurantPathParamsSchema } from "../schema/restaurant.schema";

export type ObjectIdPathParamsDTO = z.infer<typeof objectIdPathParamsSchema>;

export type restaurantIdPathParamsDTO = z.infer<
  typeof restaurantPathParamsSchema
>;

export type ValidationErrorDTO = {
  field: string;
  message: string;
};

export type CommonResponseDTO<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationErrorDTO[];
};
