import { z } from 'zod';
import {
  acceptRestaurantInvitationRequestBodySchema,
  restaurantInvitationTokenPathParamsSchema,
} from '../schema/restaurant-invitation.schema';

export type RestaurantInvitationTokenPathParamsDTO = z.infer<
  typeof restaurantInvitationTokenPathParamsSchema
>;

export type AcceptRestaurantInvitationRequestBodyDTO = z.infer<
  typeof acceptRestaurantInvitationRequestBodySchema
>;

export type AcceptRestaurantInvitationResponseBodyDTO = {
  email: string;
  restaurantId: string;
  role: 'employee' | 'super_admin' | 'admin' | 'finance';
  provisioningId?: string;
};
