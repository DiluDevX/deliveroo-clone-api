import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  ProvisionRestaurantRequestBodyDTO,
  ProvisionRestaurantResponseBodyDTO,
} from '../../dtos/admin.dto';
import { CommonResponseDTO } from '../../dtos/common.dto';
import { AuthenticatedRequest } from '../../middleware/auth-context.middleware';
import * as platformProvisioningService from '../../services/platform-provisioning.service';
import { ForbiddenError, UnauthorizedError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export const provisionRestaurant = async (
  req: Request<
    unknown,
    CommonResponseDTO<ProvisionRestaurantResponseBodyDTO>,
    ProvisionRestaurantRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<ProvisionRestaurantResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const actor = (req as AuthenticatedRequest).actor;
    if (!actor || actor.actorType !== 'PLATFORM_ADMIN') {
      throw new ForbiddenError('Platform administrator access is required');
    }

    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError('Authorization header is required');
    }

    const result = await platformProvisioningService.provisionRestaurant(
      req.body,
      actor,
      authorization
    );

    logger.info(
      {
        restaurantId: result.restaurant.id,
        ownershipId: result.ownership.id,
        invitationId: result.invitation.id,
        provisioningId: req.body.provisioningId,
        created: result.created,
      },
      'Restaurant created and owner invitation reserved'
    );

    res.status(result.created ? StatusCodes.CREATED : StatusCodes.OK).json({
      success: true,
      message: result.created
        ? 'Restaurant created and owner invitation sent successfully'
        : 'Restaurant and owner invitation already reserved',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
