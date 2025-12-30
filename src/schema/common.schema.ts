import { Types } from "mongoose";
import { z } from "zod";

export const objectIdPathParamsSchema = z.object({
  id: z.string().refine((id) => Types.ObjectId.isValid(id)),
});

export const userIdPathParamsSchema = z.object({
  userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
});

export const userIdAndDishIdPathParamsSchema = z.object({
  userId: z.string().refine((id) => Types.ObjectId.isValid(id)),
  dishId: z.string().refine((id) => Types.ObjectId.isValid(id)),
});
