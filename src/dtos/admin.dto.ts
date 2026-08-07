import { z } from 'zod';
import { provisionRestaurantRequestBodySchema } from '../schema/admin.schema';

export type ProvisionRestaurantRequestBodyDTO = z.infer<
  typeof provisionRestaurantRequestBodySchema
>;

type ProvisionRestaurantInputDTO = ProvisionRestaurantRequestBodyDTO['restaurant'];

export type ProvisionedRestaurantDTO = Omit<
  ProvisionRestaurantInputDTO,
  'address' | 'description' | 'cuisine'
> & {
  id: string;
  orgId: string;
  provisioningId: string | null;
  provisioningStatus: 'PENDING' | 'COMPLETED' | null;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  address: string | null;
  description: string | null;
  cuisine: string | null;
};

export type ProvisionedOwnerDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'restaurant_user';
};

export type ProvisionRestaurantResponseBodyDTO = {
  restaurant: ProvisionedRestaurantDTO;
  owner: ProvisionedOwnerDTO;
  membership: {
    id: string;
    restaurantId: string;
    userId: string;
    role: 'super_admin';
  };
  created: boolean;
};
