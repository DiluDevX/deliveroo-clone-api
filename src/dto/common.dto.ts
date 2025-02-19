import { z } from "zod";
import { objectIdPathParamsSchema } from "../schema/common.schema";
import { restaurantPathParamsSchema } from "../schema/restaurant.schema";

export type ObjectIdPathParamsDTO = z.infer<typeof objectIdPathParamsSchema>;

export type OrgIdPathParamsDTO = z.infer<typeof restaurantPathParamsSchema>;

export type CommonResponseDTO<T> = {
  restaurant?: string;
  token?: string;
  message: string;
  data?: T;
};

export type CommonGetAllResponseDTO<T> = {
  message: string;
  data?: T[];
};
