import { dishService } from "../services/dish.service";
import { categoryService } from "../services/category.service";
import { Request, Response } from "express";
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
} from "../dto/dish.dto";
import { CommonResponseDTO, ObjectIdPathParamsDTO } from "../dto/common.dto";
import { CreateDishRequestBodySchema } from "../schema/dish.schema";
import { z } from "zod";

interface DishFilters {
  restaurant?: string;
  category?: string;
}

const getAllDishes = async (
  req: Request<
    unknown,
    CommonResponseDTO<GetAllDishesResponseBodyDTO>,
    unknown,
    GetAllDishedRequestQueryDTO
  >,
  res: Response<CommonResponseDTO<GetAllDishesResponseBodyDTO>>,
) => {
  try {
    const filters: DishFilters = {};

    if (req.query.restaurant) {
      filters.restaurant = req.query.restaurant;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    const dishesArray = await dishService.findAll(filters, req.query.populate);

    res.status(200).json({
      message: "OK",
      data: dishesArray,
    });
    return;
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const createNewDish = async (
  req: Request<unknown, unknown, z.infer<typeof CreateDishRequestBodySchema>>,
  res: Response<CommonResponseDTO<CreateNewDishResponseBodyDTO>>,
) => {
  try {
    const foundCategory = await categoryService.findById(req.body.category);

    if (!foundCategory) {
      res.status(404).json({
        message: "Category Not Found",
      });

      return;
    }

    const createdDish = await dishService.createNew({
      ...req.body,
      restaurant: foundCategory.restaurant,
    });

    res.status(201).json({
      message: "Created",
      data: createdDish,
    });
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getADish = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetADishResponseBodyDTO>>,
) => {
  try {
    const foundDish = await dishService.findById(req.params.id);

    if (!foundDish) {
      res.status(404).json({
        message: "Dish not Found",
      });
      return;
    }

    res.status(200).json({
      message: "OK",
      data: foundDish,
    });
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateDishFully = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateDishFullyRequestBodyDTO>
  >,
  res: Response<CommonResponseDTO<UpdateDishFullyResponseBodyDTO>>,
) => {
  try {
    const foundCategory = await categoryService.findById(req.body.category);

    if (!foundCategory) {
      res.status(404).json({
        message: "Category Not Found",
      });

      return;
    }

    const updatedDish = await dishService.findByIdAndUpdate(req.params.id, {
      ...req.body,
      restaurant: foundCategory.restaurant,
    });

    if (!updatedDish) {
      res.status(404).json({
        message: "Dish Not Found",
      });

      return;
    }

    res.status(200).json({
      message: "OK",
      data: updatedDish,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateDishPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    CommonResponseDTO<UpdateDishPartiallyRequestBodyDTO>
  >,
  res: Response<CommonResponseDTO<UpdateDishPartiallyResponseBodyDTO>>,
) => {
  try {
    let foundCategory;
    if (req.body.category) {
      foundCategory = await categoryService.findById(req.body.category);

      if (!foundCategory) {
        res.status(404).json({
          message: "Category Not Found",
        });

        return;
      }
    }

    const patchedDish = await dishService.findAndUpdatePartially(
      req.params.id,
      {
        ...req.body,
        ...(foundCategory
          ? {
              restaurant: foundCategory.restaurant,
            }
          : {}),
      },
    );

    if (!patchedDish) {
      res.status(404).json({
        message: "Dish Not Found",
      });
      return;
    }

    res.status(200).json({
      message: "OK",
      data: patchedDish,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteDish = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<DeleteDishResponseBodyDTO>>,
) => {
  try {
    const deletedDish = await dishService.findByIdAndDelete(req.params.id);

    if (!deletedDish) {
      res.status(404).json({
        message: "Dish Not Found",
      });
      return;
    }

    res.status(200).json({
      message: "OK",
      data: deletedDish,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export {
  getAllDishes,
  createNewDish,
  getADish,
  updateDishPartially,
  updateDishFully,
  deleteDish,
};
