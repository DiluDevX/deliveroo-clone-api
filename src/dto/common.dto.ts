import { z } from 'zod';
import { objectIdPathParamsSchema } from '../schema/common.schema';
import { restaurantPathParamsSchema } from '../schema/restaurant.schema';

export type ObjectIdPathParamsDTO = z.infer<typeof objectIdPathParamsSchema>;

export type OrgIdPathParamsDTO = z.infer<typeof restaurantPathParamsSchema>;

export interface CommonResponseDTO<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginationInfoDTO {
  page?: number;
  limit?: number;
  totalPages?: number;
  total: number;
}

export interface PaginatedResponseDTO<T = unknown> extends CommonResponseDTO<T[]> {
  pagination: PaginationInfoDTO;
}
