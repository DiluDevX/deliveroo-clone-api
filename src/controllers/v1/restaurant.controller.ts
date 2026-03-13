import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../../utils/logger';
import { restaurantService } from '../../services/restaurant.service';
import {
  CreateNewRestaurantRequestBodyDTO,
  CreateNewRestaurantResponseBodyDTO,
  DeleteRestaurantResponseBodyDTO,
  GetAllRestaurantsResponseBodyDTO,
  GetARestaurantResponseBodyDTO,
  UpdateRestaurantFullyRequestBodyDTO,
  UpdateRestaurantFullyResponseBodyDTO,
  UpdateRestaurantPartiallyRequestBodyDTO,
  UpdateRestaurantPartiallyResponseBodyDTO,
  RestaurantResponseDTO,
} from '../../dto/restaurant.dto';
import { CommonResponseDTO, ObjectIdPathParamsDTO, OrgIdPathParamsDTO } from '../../dto/common.dto';
import { IRestaurant } from '../../models/restaurant.model';
import { NotFoundError } from '../../utils/errors';

const toResponseDTO = (restaurant: IRestaurant): RestaurantResponseDTO => ({
  id: restaurant._id.toString(),
  orgId: restaurant.orgId,
  name: restaurant.name,
  image: restaurant.image,
  description: restaurant.description,
  tags: restaurant.tags,
  openingAt: restaurant.openingAt,
  closingAt: restaurant.closingAt,
  minimumValue: restaurant.minimumValue,
  deliveryCharge: restaurant.deliveryCharge,
});

export const getAllRestaurants = async (
  _req: Request<unknown, CommonResponseDTO<GetAllRestaurantsResponseBodyDTO>, unknown, unknown>,
  res: Response<CommonResponseDTO<GetAllRestaurantsResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info('Fetching all restaurants');

    const restaurantsArray = await restaurantService.findAll();

    logger.info({ count: restaurantsArray.length }, 'Restaurants fetched successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurants fetched successfully',
      data: restaurantsArray.map(toResponseDTO),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fetch restaurants'
    );
    next(error);
  }
};

export const createNewRestaurant = async (
  req: Request<
    unknown,
    CommonResponseDTO<CreateNewRestaurantResponseBodyDTO>,
    CreateNewRestaurantRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<CreateNewRestaurantResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ name: req.body.name }, 'Creating new restaurant');

    const createdRestaurant = await restaurantService.createNew(req.body);

    logger.info({ restaurantId: createdRestaurant.id }, 'Restaurant created successfully');

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Restaurant created successfully',
      data: toResponseDTO(createdRestaurant),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to create restaurant'
    );
    next(error);
  }
};

export const getARestaurant = async (
  req: Request<OrgIdPathParamsDTO, CommonResponseDTO<GetARestaurantResponseBodyDTO>, unknown>,
  res: Response<CommonResponseDTO<GetARestaurantResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    const decodedOrgID = req.params.orgID;
    logger.info({ orgId: decodedOrgID }, 'Fetching restaurant');

    const foundRestaurant = await restaurantService.findOne(decodedOrgID);

    if (!foundRestaurant) {
      throw new NotFoundError('Restaurant not found');
    }

    logger.info({ restaurantId: foundRestaurant.id }, 'Restaurant fetched successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurant fetched successfully',
      data: toResponseDTO(foundRestaurant),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fetch restaurant'
    );
    next(error);
  }
};

export const updateARestaurantFully = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateRestaurantFullyResponseBodyDTO>,
    UpdateRestaurantFullyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateRestaurantFullyResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ restaurantId: req.params.id }, 'Fully updating restaurant');

    const updatedRestaurant = await restaurantService.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedRestaurant) {
      throw new NotFoundError('Restaurant not found');
    }

    logger.info({ restaurantId: updatedRestaurant.id }, 'Restaurant fully updated successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurant updated successfully',
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fully update restaurant'
    );
    next(error);
  }
};

export const updateARestaurantPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateRestaurantPartiallyResponseBodyDTO>,
    UpdateRestaurantPartiallyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateRestaurantPartiallyResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ restaurantId: req.params.id }, 'Partially updating restaurant');

    const updatedRestaurant = await restaurantService.findAndUpdatePartially(
      req.params.id,
      req.body
    );

    if (!updatedRestaurant) {
      throw new NotFoundError('Restaurant not found');
    }

    logger.info(
      { restaurantId: updatedRestaurant.id },
      'Restaurant partially updated successfully'
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurant updated successfully',
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to partially update restaurant'
    );
    next(error);
  }
};

export const deleteARestaurant = async (
  req: Request<ObjectIdPathParamsDTO, CommonResponseDTO<DeleteRestaurantResponseBodyDTO>, unknown>,
  res: Response<CommonResponseDTO<DeleteRestaurantResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ restaurantId: req.params.id }, 'Deleting restaurant');

    const deletedRestaurant = await restaurantService.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      throw new NotFoundError('Restaurant not found');
    }

    logger.info({ restaurantId: deletedRestaurant.id }, 'Restaurant deleted successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Restaurant deleted successfully',
      data: toResponseDTO(deletedRestaurant),
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to delete restaurant'
    );
    next(error);
  }
};
