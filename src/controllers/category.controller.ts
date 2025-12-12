import { z } from "zod";
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
} from "../dto/category.dto";
import { CommonResponseDTO, ObjectIdPathParamsDTO } from "../dto/common.dto";
import {
  CategoryPathParamsSchema,
  CategoryQueryParamsSchema,
  CreateCategoryRequestBodySchema,
} from "../schema/category.schema";
import { restaurantPathParamsSchema } from "../schema/restaurant.schema";
import { categoryService } from "../services/category.service";
import { restaurantService } from "../services/restaurant.service";
import { Request, Response } from "express";
import { ICategory } from "../models/category.model";
import { IRestaurant } from "../models/restaurant.model";

interface CategoryFilters {
  restaurant?: string;
}

const toResponseDTO = (category: ICategory): CategoryResponseDTO => ({
  id: category._id.toString(),
  name: category.name,
  restaurant: category.restaurant.toString(),
});

const getAllCategories = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof CategoryQueryParamsSchema>
  >,
  res: Response<CommonResponseDTO<GetAllCategoriesResponseBodyDTO>>,
) => {
  try {
    const filters: CategoryFilters = {};
    if (req.query.restaurant) {
      filters.restaurant =
        typeof req.query.restaurant === "number"
          ? req.query.restaurant.toString()
          : req.query.restaurant;
    }
    const categoriesArray = await categoryService.findAll(
      filters,
      req.query.populate,
    );
    res.status(200).json({
      message: "OK",
      data: categoriesArray.map(toResponseDTO),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewCategory = async (
  req: Request<
    z.infer<typeof CategoryPathParamsSchema>,
    unknown,
    z.infer<typeof CreateCategoryRequestBodySchema>
  >,
  res: Response<CommonResponseDTO<CreateNewCategoryResponseBodyDTO>>,
) => {
  try {
    const decodedOrgID = decodeURIComponent(req.params.orgID);
    const parseResult = restaurantPathParamsSchema.safeParse({
      orgID: decodedOrgID,
    });
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid orgID" });
      return;
    }
    const foundRestaurant = (await restaurantService.findOne(
      req.body.restaurant,
    )) as IRestaurant | null;
    if (!foundRestaurant) {
      res.status(404).json({ message: "Restaurant Not Found" });
      return;
    }
    const createdCategory = await categoryService.createNew(req.body);
    res.status(201).json({
      message: "Created",
      data: toResponseDTO(createdCategory),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCategory = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetACategoryResponseBodyDTO>>,
) => {
  try {
    const foundCategory = await categoryService.findById(req.params.id);
    if (!foundCategory) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(foundCategory),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCategoryFully = async (
  req: Request<
    ObjectIdPathParamsDTO,
    unknown,
    UpdateCategoryFullyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateCategoryFullyResponseBodyDTO>>,
) => {
  try {
    const foundRestaurant = await restaurantService.findOne(
      req.body.restaurant,
    );
    if (!foundRestaurant) {
      res.status(404).json({ message: "Restaurant Not Found" });
      return;
    }
    const updatedCategory = await categoryService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!updatedCategory) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(updatedCategory),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCategoryPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    unknown,
    UpdateCategoryPartiallyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateCategoryPartiallyResponseBodyDTO>>,
) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Request body is required" });
      return;
    }
    if (req.body.restaurant) {
      const foundRestaurant = await restaurantService.findOne(
        req.body.restaurant,
      );
      if (!foundRestaurant) {
        res.status(404).json({ message: "Restaurant Not Found" });
        return;
      }
    }
    const patchedCategory = await categoryService.findAndUpdatePartially(
      req.params.id,
      req.body,
    );
    if (!patchedCategory) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(patchedCategory),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<DeleteCategoryResponseBodyDTO>>,
) => {
  try {
    const deletedCategory = await categoryService.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedCategory) {
      res.status(404).json({ message: "Category Not Found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(deletedCategory),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal server error" });
  }
};

export = {
  getAllCategories,
  createNewCategory,
  getCategory,
  updateCategoryPartially,
  updateCategoryFully,
  deleteCategory,
};
