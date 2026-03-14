import { z } from 'zod';
import {
  CreateNewCategoryResponseBodyDTO,
  DeleteCategoryResponseBodyDTO,
  GetACategoryResponseBodyDTO,
  GetAllCategoriesResponseBodyDTO,
  UpdateCategoryFullyRequestBodyDTO,
  UpdateCategoryFullyResponseBodyDTO,
  UpdateCategoryPartiallyRequestBodyDTO,
  UpdateCategoryPartiallyResponseBodyDTO,
  CategoryResponseDTO,
} from '../../dto/category.dto';
import { CommonResponseDTO, ObjectIdPathParamsDTO } from '../../dto/common.dto';
import {
  CategoryPathParamsSchema,
  CategoryQueryParamsSchema,
  CreateCategoryRequestBodySchema,
} from '../../schema/category.schema';
import { restaurantPathParamsSchema } from '../../schema/restaurant.schema';
import { categoryService } from '../../services/category.service';
import { restaurantService } from '../../services/restaurant.service';
import { Request, Response, NextFunction } from 'express';
import { ICategory } from '../../models/category.model';
import { IRestaurant } from '../../models/restaurant.model';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../../utils/logger';
import { NotFoundError, BadRequestError } from '../../utils/errors';

interface CategoryFilters {
  restaurant?: string;
}

export const toResponseDTO = (category: ICategory): CategoryResponseDTO => ({
  id: category._id.toString(),
  name: category.name,
  restaurant: category.restaurant.toString(),
});

export const getAllCategories = async (
  req: Request<unknown, unknown, unknown, z.infer<typeof CategoryQueryParamsSchema>>,
  res: Response<CommonResponseDTO<GetAllCategoriesResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const filters: CategoryFilters = {};
    if (req.query.restaurant) {
      filters.restaurant =
        typeof req.query.restaurant === 'number'
          ? req.query.restaurant.toString()
          : req.query.restaurant;
    }
    const categoriesArray = await categoryService.findAll(filters, req.query.populate);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categoriesArray.map(toResponseDTO),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to retrieve categories');
    next(error);
  }
};

export const createNewCategory = async (
  req: Request<
    z.infer<typeof CategoryPathParamsSchema>,
    unknown,
    z.infer<typeof CreateCategoryRequestBodySchema>
  >,
  res: Response<CommonResponseDTO<CreateNewCategoryResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const orgID = req.params.orgID;
    const parseResult = restaurantPathParamsSchema.safeParse({
      orgID,
    });
    if (!parseResult.success) {
      next(new BadRequestError('Invalid orgID'));
      return;
    }
    const foundRestaurant = (await restaurantService.findOne(orgID)) as IRestaurant | null;
    if (!foundRestaurant) {
      next(new NotFoundError('Restaurant not found'));
      return;
    }
    const createdCategory = await categoryService.createNew({
      ...req.body,
      restaurant: foundRestaurant._id.toString(),
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Category created successfully',
      data: toResponseDTO(createdCategory),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to create category');
    next(error);
  }
};

export const getCategory = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetACategoryResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const foundCategory = await categoryService.findById(req.params.id);
    if (!foundCategory) {
      next(new NotFoundError('Category not found'));
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Category retrieved successfully',
      data: toResponseDTO(foundCategory),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to retrieve category');
    next(error);
  }
};

export const updateCategoryFully = async (
  req: Request<ObjectIdPathParamsDTO, unknown, UpdateCategoryFullyRequestBodyDTO>,
  res: Response<CommonResponseDTO<UpdateCategoryFullyResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const foundRestaurant = await restaurantService.findOne(req.body.restaurant);
    if (!foundRestaurant) {
      next(new NotFoundError('Restaurant not found'));
      return;
    }
    const updatedCategory = await categoryService.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedCategory) {
      next(new NotFoundError('Category not found'));
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Category updated successfully',
      data: toResponseDTO(updatedCategory),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to update category');
    next(error);
  }
};

export const updateCategoryPartially = async (
  req: Request<ObjectIdPathParamsDTO, unknown, UpdateCategoryPartiallyRequestBodyDTO>,
  res: Response<CommonResponseDTO<UpdateCategoryPartiallyResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      next(new BadRequestError('Request body is required'));
      return;
    }
    if (req.body.restaurant) {
      const foundRestaurant = await restaurantService.findOne(req.body.restaurant);
      if (!foundRestaurant) {
        next(new NotFoundError('Restaurant not found'));
        return;
      }
    }
    const patchedCategory = await categoryService.findAndUpdatePartially(req.params.id, req.body);
    if (!patchedCategory) {
      next(new NotFoundError('Category not found'));
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Category updated successfully',
      data: toResponseDTO(patchedCategory),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to update category');
    next(error);
  }
};

export const deleteCategory = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<DeleteCategoryResponseBodyDTO>>,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedCategory = await categoryService.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      next(new NotFoundError('Category not found'));
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Category deleted successfully',
      data: toResponseDTO(deletedCategory),
    });
  } catch (error) {
    logger.error({ error }, 'Failed to delete category');
    next(error);
  }
};
