import { z } from 'zod';

export const restaurantInvitationTokenPathParamsSchema = z.object({
  token: z.string().min(32, 'Invalid invitation token').max(200, 'Invalid invitation token'),
});

export const acceptRestaurantInvitationRequestBodySchema = z.object({
  firstName: z.string().trim().min(1).max(50).optional(),
  lastName: z.string().trim().min(1).max(50).optional(),
  password: z.string().min(8).max(100),
});
