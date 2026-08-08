import { Router } from 'express';
import { provisionRestaurant } from '../../controllers/v1/admin.controller';
import { validateBody } from '../../middleware/validate.middleware';
import { provisionRestaurantRequestBodySchema } from '../../schema/admin.schema';

const router = Router();

router.post(
  '/restaurants',
  validateBody(provisionRestaurantRequestBodySchema),
  provisionRestaurant
);

export default router;
