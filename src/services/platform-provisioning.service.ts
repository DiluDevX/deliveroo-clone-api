import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { environment } from '../config/environment';
import {
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
  UnauthorizedError,
} from '../utils/errors';
import { logger } from '../utils/logger';

type ServiceResponseDTO<T> = {
  success: boolean;
  message: string;
  data?: T;
};

type OwnerInvitationReservationResult = {
  ownership: ProvisionRestaurantResponseBodyDTO['ownership'];
  invitation: ProvisionRestaurantResponseBodyDTO['invitation'];
  created: boolean;
};

type RestaurantProvisioningResult = {
  restaurant: ProvisionedRestaurantDTO;
  created: boolean;
};

const getDownstreamServiceErrorMessage = (error: AxiosError): string | undefined => {
  const data = error.response?.data;
  if (typeof data !== 'object' || data === null) {
    return undefined;
  }

  const message = Reflect.get(data, 'message');
  return typeof message === 'string' ? message : undefined;
};

const buildRestaurantServiceHeaders = (actor: ActorContextDTO) => ({
  'x-api-key': environment.restaurantService.apiKey,
  'x-actor-type': 'ADMIN',
  'x-actor-id': actor.actorId,
  'x-actor-user-id': actor.actorUserId,
});

const buildRestaurantProvisioningPath = (provisioningId: string): string =>
  `/v1/restaurants/provisioning/${encodeURIComponent(provisioningId)}`;

const throwMappedRestaurantServiceError = (error: AxiosError): never => {
  if (error.response?.status === StatusCodes.BAD_REQUEST) {
    throw new BadRequestError(
      getDownstreamServiceErrorMessage(error) ?? 'Restaurant details are invalid'
    );
  }

  throw new ServiceUnavailableError('Restaurant service is temporarily unavailable');
};

const assertRecoveredRestaurantMatchesProvisioningRequest = (
  existing: ProvisionedRestaurantDTO,
  requested: ProvisionRestaurantRequestBodyDTO['restaurant'],
  provisioningId: string
): void => {
  if (existing.provisioningId !== provisioningId) {
    throw new ConflictError('Restaurant is not associated with this provisioning operation');
  }

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

const createOrRecoverRestaurantForProvisioning = async (
  input: ProvisionRestaurantRequestBodyDTO,
  actor: ActorContextDTO
): Promise<RestaurantProvisioningResult> => {
  try {
    const response = await axios.post<ServiceResponseDTO<ProvisionedRestaurantDTO>>(
      `${environment.restaurantService.url}/v1/restaurants`,
      {
        ...input.restaurant,
        orgId: input.provisioningId,
        provisioningId: input.provisioningId,
      },
      { headers: buildRestaurantServiceHeaders(actor), timeout: 10000 }
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
      return throwMappedRestaurantServiceError(error);
    }
  }

  try {
    const response = await axios.get<ServiceResponseDTO<ProvisionedRestaurantDTO>>(
      `${environment.restaurantService.url}${buildRestaurantProvisioningPath(input.provisioningId)}`,
      { headers: buildRestaurantServiceHeaders(actor), timeout: 10000 }
    );
    if (!response.data.data) {
      throw new ServiceUnavailableError('Restaurant service returned an invalid response');
    }

    assertRecoveredRestaurantMatchesProvisioningRequest(
      response.data.data,
      input.restaurant,
      input.provisioningId
    );
    return { restaurant: response.data.data, created: false };
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    return throwMappedRestaurantServiceError(error);
  }
};

const deletePendingRestaurantAfterOwnerProvisioningRejection = async (
  restaurantId: string,
  provisioningId: string,
  actor: ActorContextDTO
): Promise<void> => {
  try {
    await axios.delete(
      `${environment.restaurantService.url}${buildRestaurantProvisioningPath(provisioningId)}`,
      {
        headers: buildRestaurantServiceHeaders(actor),
        timeout: 10000,
      }
    );
    logger.warn({ restaurantId }, 'Compensated restaurant after owner invitation rejection');
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

const shouldDeletePendingRestaurantAfterOwnerFailure = (
  error: AxiosError,
  restaurant: ProvisionedRestaurantDTO
): boolean => {
  const status = error.response?.status;
  return (
    restaurant.provisioningStatus === 'PENDING' &&
    (status === StatusCodes.BAD_REQUEST ||
      status === StatusCodes.UNAUTHORIZED ||
      status === StatusCodes.FORBIDDEN)
  );
};

const throwMappedOwnerInvitationError = (error: AxiosError): never => {
  const status = error.response?.status;

  if (status === StatusCodes.CONFLICT) {
    throw new ConflictError(
      getDownstreamServiceErrorMessage(error) ?? 'Restaurant owner already exists'
    );
  }
  if (status === StatusCodes.BAD_REQUEST) {
    throw new BadRequestError(
      getDownstreamServiceErrorMessage(error) ?? 'Restaurant owner details are invalid'
    );
  }
  if (status === StatusCodes.UNAUTHORIZED) {
    throw new UnauthorizedError('Authentication is required');
  }
  if (status === StatusCodes.FORBIDDEN) {
    throw new ForbiddenError('Platform administrator access is required');
  }
  throw new ServiceUnavailableError(
    'Owner invitation could not be confirmed. Retry with the same provisioning id.'
  );
};

const reserveOwnershipAndInviteInitialRestaurantOwner = async (
  input: ProvisionRestaurantRequestBodyDTO,
  restaurantId: string,
  authorization: string
): Promise<OwnerInvitationReservationResult> => {
  const response = await axios.post<ServiceResponseDTO<OwnerInvitationReservationResult>>(
    `${environment.authService.url}/v1/users/restaurant-owner-invitations`,
    {
      ...input.owner,
      restaurantId,
      restaurantName: input.restaurant.name,
      provisioningId: input.provisioningId,
    },
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
  const restaurantResult = await createOrRecoverRestaurantForProvisioning(input, actor);
  let ownerInvitationResult: OwnerInvitationReservationResult;

  try {
    ownerInvitationResult = await reserveOwnershipAndInviteInitialRestaurantOwner(
      input,
      restaurantResult.restaurant.id,
      authorization
    );
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (shouldDeletePendingRestaurantAfterOwnerFailure(error, restaurantResult.restaurant)) {
      await deletePendingRestaurantAfterOwnerProvisioningRejection(
        restaurantResult.restaurant.id,
        input.provisioningId,
        actor
      );
    }
    return throwMappedOwnerInvitationError(error);
  }

  return {
    restaurant: restaurantResult.restaurant,
    ownership: ownerInvitationResult.ownership,
    invitation: ownerInvitationResult.invitation,
    created: restaurantResult.created || ownerInvitationResult.created,
  };
};
