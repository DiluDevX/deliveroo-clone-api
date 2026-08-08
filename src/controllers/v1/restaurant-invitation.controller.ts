import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CommonResponseDTO } from '../../dtos/common.dto';
import {
  AcceptRestaurantInvitationRequestBodyDTO,
  AcceptRestaurantInvitationResponseBodyDTO,
  RestaurantInvitationTokenPathParamsDTO,
} from '../../dtos/restaurant-invitation.dto';
import * as restaurantInvitationAcceptanceService from '../../services/restaurant-invitation-acceptance.service';
import { logger } from '../../utils/logger';

export const acceptRestaurantInvitation = async (
  req: Request<
    RestaurantInvitationTokenPathParamsDTO,
    CommonResponseDTO<AcceptRestaurantInvitationResponseBodyDTO>,
    AcceptRestaurantInvitationRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<AcceptRestaurantInvitationResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result =
      await restaurantInvitationAcceptanceService.acceptInvitationAndActivateRestaurant(
        req.params.token,
        req.body
      );

    logger.info(
      {
        restaurantId: result.restaurantId,
        provisioningId: result.provisioningId,
        role: result.role,
      },
      'Restaurant invitation accepted'
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurant invitation accepted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
