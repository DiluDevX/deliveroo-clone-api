import { z } from 'zod';

export const provisionRestaurantRequestBodySchema = z.object({
  provisioningId: z.string().uuid('provisioningId must be a valid UUID'),
  restaurant: z.object({
    name: z.string().trim().min(1).max(200),
    image: z.string().url(),
    address: z.string().trim().max(500).optional(),
    description: z.string().trim().max(1000).optional(),
    tags: z.array(z.string().trim()).default([]),
    openingAt: z.string().trim().min(1),
    closingAt: z.string().trim().min(1),
    minimumValue: z.number().min(0),
    deliveryCharge: z.number().min(0),
    commissionPercentage: z.number().min(0).max(100).default(15),
    cuisine: z.string().trim().optional(),
  }),
  owner: z.object({
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
    email: z.string().trim().email(),
  }),
});
