import { Router } from 'express';
import { proxyService } from '../../services/proxy.service';
import { MICROSERVICE_NAMES } from '../../utils/constants';
import { validateBody, validateParams } from '../../middleware/validate.middleware';
import {
  acceptRestaurantInvitationRequestBodySchema,
  restaurantInvitationTokenPathParamsSchema,
} from '../../schema/restaurant-invitation.schema';
import { acceptRestaurantInvitation } from '../../controllers/v1/restaurant-invitation.controller';

const router = Router();

router.post(
  '/restaurant-invitations/:token/accept',
  validateParams(restaurantInvitationTokenPathParamsSchema),
  validateBody(acceptRestaurantInvitationRequestBodySchema),
  acceptRestaurantInvitation
);

router.use('/', proxyService.createProxyHandler(MICROSERVICE_NAMES.AUTH_SERVICE));

export default router;
