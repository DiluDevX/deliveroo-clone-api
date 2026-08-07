import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { environment } from '../config/environment';
import {
  ProvisionedOwnerDTO,
  ProvisionedRestaurantDTO,
  ProvisionRestaurantRequestBodyDTO,
  ProvisionRestaurantResponseBodyDTO,
} from '../dtos/admin.dto';
import { ActorContextDTO } from '../dtos/auth.dto';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  ServiceUnavailableError,
} from '../utils/errors';
import { logger } from '../utils/logger';

type ServiceResponseDTO<T> = {
  success: boolean;
  message: string;
  data?: T;
};

type OwnerProvisioningResult = {
  user: ProvisionedOwnerDTO;
  membership: ProvisionRestaurantResponseBodyDTO['membership'];
  created: boolean;
};

type RestaurantResult = {
  restaurant: ProvisionedRestaurantDTO;
  created: boolean;
};

const getServiceMessage = (error: AxiosError): string | undefined => {
  const data = error.response?.data;
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const message = data.message;
    return typeof message === 'string' ? message : undefined;
  }
  return undefined;
};

const restaurantHeaders = (actor: ActorContextDTO) => ({
  'x-api-key': environment.restaurantService.apiKey,
  'x-actor-type': 'ADMIN',
  'x-actor-id': actor.actorId,
  'x-actor-user-id': actor.actorUserId,
});

const assertRestaurantMatchesRequest = (
  existing: ProvisionedRestaurantDTO,
  requested: ProvisionRestaurantRequestBodyDTO['restaurant']
): void => {
  const existingComparable = {
    name: existing.name,
    image: existing.image,
    address: existing.address ?? undefined,
    description: existing.description ?? undefined,
    tags: existing.tags,
    openingAt: existing.openingAt,
    closingAt: existing.closingAt,
    minimumValue: existing.minimumValue,
    deliveryCharge: existing.deliveryCharge,
    commissionPercentage: existing.commissionPercentage,
    cuisine: existing.cuisine ?? undefined,
  };

  if (JSON.stringify(existingComparable) !== JSON.stringify(requested)) {
    throw new ConflictError('This provisioning id was already used with different restaurant data');
  }
};

const ensureRestaurant = async (
  input: ProvisionRestaurantRequestBodyDTO,
  actor: ActorContextDTO
): Promise<RestaurantResult> => {
  try {
    const response = await axios.post<ServiceResponseDTO<ProvisionedRestaurantDTO>>(
      `${environment.restaurantService.url}/v1/restaurants`,
      { ...input.restaurant, orgId: input.provisioningId },
      { headers: restaurantHeaders(actor), timeout: 10000 }
    );

    if (!response.data.data) {
      throw new ServiceUnavailableError('Restaurant service returned an invalid response');
    }

    return { restaurant: response.data.data, created: true };
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (error.response?.status !== StatusCodes.CONFLICT) {
      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        throw new BadRequestError(getServiceMessage(error) ?? 'Restaurant details are invalid');
      }
      throw new ServiceUnavailableError('Restaurant service is temporarily unavailable');
    }

    const response = await axios.get<ServiceResponseDTO<ProvisionedRestaurantDTO>>(
      `${environment.restaurantService.url}/v1/restaurants/by-org-id/${input.provisioningId}`,
      { headers: restaurantHeaders(actor), timeout: 10000 }
    );
    if (!response.data.data) {
      throw new ServiceUnavailableError('Restaurant service returned an invalid response');
    }

    assertRestaurantMatchesRequest(response.data.data, input.restaurant);
    return { restaurant: response.data.data, created: false };
  }
};

const compensateRestaurant = async (
  restaurantId: string,
  provisioningId: string,
  actor: ActorContextDTO
): Promise<void> => {
  try {
    await axios.delete(
      `${environment.restaurantService.url}/v1/restaurants/provisioning/${provisioningId}`,
      { headers: restaurantHeaders(actor), timeout: 10000 }
    );
    logger.warn({ restaurantId }, 'Compensated restaurant after owner provisioning rejection');
  } catch (error) {
    logger.error(
      {
        restaurantId,
        error: error instanceof Error ? error.message : 'Unknown compensation error',
      },
      'Restaurant provisioning compensation failed; manual reconciliation is required'
    );
  }
};

const provisionOwner = async (
  input: ProvisionRestaurantRequestBodyDTO,
  restaurantId: string,
  authorization: string
): Promise<OwnerProvisioningResult> => {
  const response = await axios.post<ServiceResponseDTO<OwnerProvisioningResult>>(
    `${environment.authService.url}/v1/users/restaurant-owners`,
    { ...input.owner, restaurantId },
    {
      headers: {
        'x-api-key': environment.authService.apiKey,
        authorization,
      },
      timeout: 10000,
    }
  );

  if (!response.data.data) {
    throw new ServiceUnavailableError('Auth service returned an invalid response');
  }
  return response.data.data;
};

export const provisionRestaurant = async (
  input: ProvisionRestaurantRequestBodyDTO,
  actor: ActorContextDTO,
  authorization: string
): Promise<ProvisionRestaurantResponseBodyDTO> => {
  const restaurantResult = await ensureRestaurant(input, actor);

  try {
    const ownerResult = await provisionOwner(input, restaurantResult.restaurant.id, authorization);

    return {
      restaurant: restaurantResult.restaurant,
      owner: ownerResult.user,
      membership: ownerResult.membership,
      created: restaurantResult.created || ownerResult.created,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const isDefinitiveRejection =
        status !== undefined && status >= StatusCodes.BAD_REQUEST && status < 500;

      if (restaurantResult.created && isDefinitiveRejection) {
        await compensateRestaurant(restaurantResult.restaurant.id, input.provisioningId, actor);
      }

      if (status === StatusCodes.CONFLICT) {
        throw new ConflictError(getServiceMessage(error) ?? 'Restaurant owner already exists');
      }
      if (status === StatusCodes.BAD_REQUEST) {
        throw new BadRequestError(
          getServiceMessage(error) ?? 'Restaurant owner details are invalid'
        );
      }
      if (status === StatusCodes.FORBIDDEN || status === StatusCodes.UNAUTHORIZED) {
        throw new ForbiddenError('Platform administrator access is required');
      }
      throw new ServiceUnavailableError(
        'Owner provisioning could not be confirmed. Retry with the same provisioning id.'
      );
    }

    throw error;
  }
};
