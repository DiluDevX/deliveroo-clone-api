import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { environment } from '../../config/environment';
import { CommonResponseDTO } from '../../dtos/common.dto';
import { AuthenticatedRequest } from '../../middleware/auth-context.middleware';
import { BadRequestError, ForbiddenError } from '../../utils/errors';
import { logger } from '../../utils/logger';

interface CreatePaymentIntentRequestDTO {
  orderId?: string;
  expectedTotalAmount?: number;
}

interface PaymentIntentResponseDTO {
  paymentId: string;
  status: string;
  clientSecret?: string | null;
}

interface ServiceResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const createPaymentIntent = async (
  req: Request<unknown, CommonResponseDTO<PaymentIntentResponseDTO>, CreatePaymentIntentRequestDTO>,
  res: Response<CommonResponseDTO<PaymentIntentResponseDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId, expectedTotalAmount } = req.body;
    const actor = (req as AuthenticatedRequest).actor;

    if (!actor?.userId) {
      throw new ForbiddenError('Authenticated user context is required');
    }

    if (!orderId) {
      throw new BadRequestError('orderId is required');
    }

    const orderResponse = await axios.post<ServiceResponseDTO<PaymentIntentResponseDTO>>(
      `${environment.orderService.url}/v1/orders/${orderId}/prepare-payment`,
      { expectedTotalAmount },
      {
        headers: {
          'x-api-key': environment.orderService.apiKey,
          'x-user-id': actor.userId,
          'x-actor-id': actor.actorId,
          'x-actor-user-id': actor.actorUserId,
          'x-actor-type': actor.actorType,
        },
      }
    );

    const paymentIntent = orderResponse.data.data;
    if (!paymentIntent) {
      throw new BadRequestError('Payment intent unavailable');
    }

    logger.info(
      { orderId, paymentId: paymentIntent.paymentId },
      'Payment intent created for order'
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Payment intent created',
      data: paymentIntent,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
      return;
    }

    logger.error(error, 'create BFF payment intent error');
    next(error);
  }
};
