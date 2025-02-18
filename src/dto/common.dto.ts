import { z } from "zod";
import { objectIdPathParamsSchema } from "../schema/common.schema";

export type ObjectIdPathParamsDTO = z.infer<typeof objectIdPathParamsSchema>;

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
