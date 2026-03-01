import { restaurantService } from "../services/restaurant.service";
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
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
} from "../dto/restaurant.dto";
import {
  CommonResponseDTO,
  ObjectIdPathParamsDTO,
  restaurantIdPathParamsDTO,
} from "../dto/common.dto";
import { IRestaurant } from "../models/restaurant.model";

const toResponseDTO = (restaurant: IRestaurant): RestaurantResponseDTO => ({
  id: restaurant._id.toString(),
  name: restaurant.name,
  image: restaurant.image,
  description: restaurant.description,
  tags: restaurant.tags,
  minimumValue: restaurant.minimumValue,
  deliveryCharge: restaurant.deliveryCharge,
  cuisine: restaurant.cuisine,
  rating: restaurant.rating,
  status: restaurant.status,
  operatingHours: restaurant.operatingHours,
  commissionPercentage: restaurant.commissionPercentage,
});

const getAllRestaurants = async (
  _req: Request<
    unknown,
    CommonResponseDTO<GetAllRestaurantsResponseBodyDTO>,
    unknown,
    unknown
  >,
  res: Response<CommonResponseDTO<GetAllRestaurantsResponseBodyDTO>>,
) => {
  try {
    const restaurantsArray = await restaurantService.findAll();
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "OK",
      data: restaurantsArray.map(toResponseDTO),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const createNewRestaurant = async (
  req: Request<unknown, unknown, CreateNewRestaurantRequestBodyDTO>,
  res: Response<CommonResponseDTO<CreateNewRestaurantResponseBodyDTO>>,
) => {
  try {
    const createdRestaurant = await restaurantService.createNew(req.body);
    res.status(HttpStatusCode.Created).json({
      success: true,
      message: "Restaurant created successfully",
      data: toResponseDTO(createdRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getARestaurant = async (
  req: Request<restaurantIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetARestaurantResponseBodyDTO>>,
) => {
  try {
    const decodedRestaurantID = decodeURIComponent(req.params.restaurantId);
    const foundRestaurant =
      await restaurantService.findOne(decodedRestaurantID);
    if (!foundRestaurant) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Restaurant Not found" });
      return;
    }
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "OK",
      data: toResponseDTO(foundRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateARestaurantFully = async (
  req: Request<
    ObjectIdPathParamsDTO,
    unknown,
    UpdateRestaurantFullyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateRestaurantFullyResponseBodyDTO>>,
) => {
  try {
    const updatedRestaurant = await restaurantService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!updatedRestaurant) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Restaurant Not found" });
      return;
    }
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "Updated Restaurant",
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateARestaurantPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    unknown,
    UpdateRestaurantPartiallyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateRestaurantPartiallyResponseBodyDTO>>,
) => {
  try {
    const updatedRestaurant = await restaurantService.findAndUpdatePartially(
      req.params.id,
      req.body,
    );
    if (!updatedRestaurant) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Restaurant Not found" });
      return;
    }
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "OK",
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteARestaurant = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<DeleteRestaurantResponseBodyDTO>>,
) => {
  try {
    const deletedRestaurant = await restaurantService.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedRestaurant) {
      res
        .status(HttpStatusCode.NotFound)
        .json({ success: false, message: "Restaurant Not found" });
      return;
    }
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "OK",
      data: toResponseDTO(deletedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  getAllRestaurants,
  createNewRestaurant,
  getARestaurant,
  updateARestaurantPartially,
  updateARestaurantFully,
  deleteARestaurant,
};
