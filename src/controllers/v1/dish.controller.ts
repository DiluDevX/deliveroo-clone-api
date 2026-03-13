import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../../utils/logger';
import { dishService } from '../../services/dish.service';
import { categoryService } from '../../services/category.service';
import { restaurantService } from '../../services/restaurant.service';
import {
  CreateNewDishResponseBodyDTO,
  DeleteDishResponseBodyDTO,
  GetADishResponseBodyDTO,
  GetAllDishedRequestQueryDTO,
  GetAllDishesResponseBodyDTO,
  UpdateDishFullyRequestBodyDTO,
  UpdateDishFullyResponseBodyDTO,
  UpdateDishPartiallyRequestBodyDTO,
  UpdateDishPartiallyResponseBodyDTO,
} from '../../dto/dish.dto';
import { CommonResponseDTO, ObjectIdPathParamsDTO } from '../../dto/common.dto';
import { CreateDishRequestBodySchema } from '../../schema/dish.schema';
import { z } from 'zod';
import { NotFoundError } from '../../utils/errors';

interface DishFilters {
  restaurant?: string;
  category?: string;
}

export const getAllDishes = async (
  req: Request<
    unknown,
    CommonResponseDTO<GetAllDishesResponseBodyDTO>,
    unknown,
    GetAllDishedRequestQueryDTO
  >,
  res: Response<CommonResponseDTO<GetAllDishesResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info('Fetching all dishes');

    const filters: DishFilters = {};

    if (req.query.restaurant) {
      filters.restaurant = req.query.restaurant;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    const dishesArray = await dishService.findAll(filters, req.query.populate);

    logger.info({ count: dishesArray.length }, 'Dishes fetched successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Dishes fetched successfully',
      data: dishesArray,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fetch dishes'
    );
    next(error);
  }
};

export const createNewDish = async (
  req: Request<
    unknown,
    CommonResponseDTO<CreateNewDishResponseBodyDTO>,
    z.infer<typeof CreateDishRequestBodySchema>
  >,
  res: Response<CommonResponseDTO<CreateNewDishResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info(
      { restaurant: req.body.restaurant, category: req.body.category },
      'Creating new dish'
    );

    const foundRestaurant = await restaurantService.findOne(req.body.restaurant);

    if (!foundRestaurant) {
      throw new NotFoundError('Restaurant not found');
    }

    const foundCategory = await categoryService.findById(req.body.category);

    if (!foundCategory) {
      throw new NotFoundError('Category not found');
    }

    const createdDish = await dishService.createNew({
      ...req.body,
      restaurant: foundCategory.restaurant.toString(),
    });

    logger.info({ dishId: createdDish.id }, 'Dish created successfully');

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Dish created successfully',
      data: createdDish,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to create dish'
    );
    next(error);
  }
};

export const getADish = async (
  req: Request<ObjectIdPathParamsDTO, CommonResponseDTO<GetADishResponseBodyDTO>, unknown>,
  res: Response<CommonResponseDTO<GetADishResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ dishId: req.params.id }, 'Fetching dish');

    const foundDish = await dishService.findById(req.params.id);

    if (!foundDish) {
      throw new NotFoundError('Dish not found');
    }

    logger.info({ dishId: foundDish.id }, 'Dish fetched successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Dish fetched successfully',
      data: foundDish,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fetch dish'
    );
    next(error);
  }
};

export const updateDishFully = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateDishFullyResponseBodyDTO>,
    UpdateDishFullyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateDishFullyResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ dishId: req.params.id }, 'Fully updating dish');

    const foundCategory = await categoryService.findById(req.body.category);

    if (!foundCategory) {
      throw new NotFoundError('Category not found');
    }

    const updatedDish = await dishService.findByIdAndUpdate(req.params.id, {
      ...req.body,
      restaurant: foundCategory.restaurant.toString(),
    });

    if (!updatedDish) {
      throw new NotFoundError('Dish not found');
    }

    logger.info({ dishId: updatedDish.id }, 'Dish fully updated successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Dish updated successfully',
      data: updatedDish,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to fully update dish'
    );
    next(error);
  }
};

export const updateDishPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateDishPartiallyResponseBodyDTO>,
    UpdateDishPartiallyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateDishPartiallyResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ dishId: req.params.id }, 'Partially updating dish');

    let foundCategory;
    if (req.body.category) {
      foundCategory = await categoryService.findById(req.body.category);

      if (!foundCategory) {
        throw new NotFoundError('Category not found');
      }
    }

    const patchedDish = await dishService.findAndUpdatePartially(req.params.id, {
      ...req.body,
      ...(foundCategory
        ? {
            restaurant: foundCategory.restaurant.toString(),
          }
        : {}),
    });

    if (!patchedDish) {
      throw new NotFoundError('Dish not found');
    }

    logger.info({ dishId: patchedDish.id }, 'Dish partially updated successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Dish updated successfully',
      data: patchedDish,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to partially update dish'
    );
    next(error);
  }
};

export const deleteDish = async (
  req: Request<ObjectIdPathParamsDTO, CommonResponseDTO<DeleteDishResponseBodyDTO>, unknown>,
  res: Response<CommonResponseDTO<DeleteDishResponseBodyDTO>>,
  next: NextFunction
) => {
  try {
    logger.info({ dishId: req.params.id }, 'Deleting dish');

    const deletedDish = await dishService.findByIdAndDelete(req.params.id);

    if (!deletedDish) {
      throw new NotFoundError('Dish not found');
    }

    logger.info({ dishId: deletedDish.id }, 'Dish deleted successfully');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Dish deleted successfully',
      data: deletedDish,
    });
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      'Failed to delete dish'
    );
    next(error);
  }
};
