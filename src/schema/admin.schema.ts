import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[0-9]/, 'Password must include a number');

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
    password: passwordSchema,
  }),
});
