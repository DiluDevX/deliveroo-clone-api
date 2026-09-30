import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { environment } from '../config/environment';
import {
  AcceptRestaurantInvitationRequestBodyDTO,
  AcceptRestaurantInvitationResponseBodyDTO,
} from '../dtos/restaurant-invitation.dto';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
} from '../utils/errors';

type ServiceResponseDTO<T> = {
  success: boolean;
  message: string;
  data?: T;
};

const getDownstreamMessage = (error: AxiosError): string | undefined => {
  const data = error.response?.data;
  if (typeof data !== 'object' || data === null) {
    return undefined;
  }
  const message = Reflect.get(data, 'message');
  return typeof message === 'string' ? message : undefined;
};

const throwMappedAuthInvitationError = (error: AxiosError): never => {
  const message = getDownstreamMessage(error);
  switch (error.response?.status) {
    case StatusCodes.BAD_REQUEST:
      throw new BadRequestError(message ?? 'Invitation details are invalid');
    case StatusCodes.UNAUTHORIZED:
      throw new UnauthorizedError(message ?? 'The account password is incorrect');
    case StatusCodes.NOT_FOUND:
      throw new NotFoundError(message ?? 'Restaurant invitation was not found');
    case StatusCodes.CONFLICT:
      throw new ConflictError(message ?? 'Restaurant invitation has already been used');
    default:
      throw new ServiceUnavailableError('Auth service is temporarily unavailable');
  }
};

const completeRestaurantProvisioning = async (provisioningId: string): Promise<void> => {
  try {
    await axios.patch(
      `${environment.restaurantService.url}/v1/restaurants/provisioning/${encodeURIComponent(provisioningId)}/complete`,
      undefined,
      {
        headers: {
          'x-api-key': environment.restaurantService.apiKey,
          'x-actor-type': 'SYSTEM',
          'x-actor-id': environment.serviceName,
        },
        timeout: 10000,
      }
    );
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new ServiceUnavailableError(
      'Invitation was accepted, but restaurant activation is still pending. Retry this invitation.'
    );
  }
};

export const acceptInvitationAndActivateRestaurant = async (
  token: string,
  input: AcceptRestaurantInvitationRequestBodyDTO
): Promise<AcceptRestaurantInvitationResponseBodyDTO> => {
  let acceptance: AcceptRestaurantInvitationResponseBodyDTO;
  try {
    const response = await axios.post<
      ServiceResponseDTO<AcceptRestaurantInvitationResponseBodyDTO>
    >(
      `${environment.authService.url}/v1/auth/restaurant-invitations/${encodeURIComponent(token)}/accept`,
      input,
      {
        headers: { 'x-api-key': environment.authService.apiKey },
        timeout: 10000,
      }
    );
    if (!response.data.data) {
      throw new ServiceUnavailableError('Auth service returned an invalid response');
    }
    acceptance = response.data.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    return throwMappedAuthInvitationError(error);
  }

  if (acceptance.provisioningId) {
    await completeRestaurantProvisioning(acceptance.provisioningId);
  }

  return acceptance;
};
