import { restaurantService } from "../services/restaurant.service";
import { Request, Response } from "express";
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
  OrgIdPathParamsDTO,
} from "../dto/common.dto";
import { IRestaurant } from "../models/restaurant.model";

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
    res.status(200).json({
      message: "OK",
      data: restaurantsArray.map(toResponseDTO),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewRestaurant = async (
  req: Request<unknown, unknown, CreateNewRestaurantRequestBodyDTO>,
  res: Response<CommonResponseDTO<CreateNewRestaurantResponseBodyDTO>>,
) => {
  try {
    const createdRestaurant = await restaurantService.createNew(req.body);
    res.status(201).json({
      message: "Created",
      data: toResponseDTO(createdRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getARestaurant = async (
  req: Request<OrgIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetARestaurantResponseBodyDTO>>,
) => {
  try {
    const decodedOrgID = decodeURIComponent(req.params.orgID);
    const foundRestaurant = await restaurantService.findOne(decodedOrgID);
    if (!foundRestaurant) {
      res.status(404).json({ message: "Restaurant Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(foundRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
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
      res.status(404).json({ message: "Restaurant Not found" });
      return;
    }
    res.status(200).json({
      message: "Updated Restaurant",
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
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
      res.status(404).json({ message: "Restaurant Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(updatedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
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
      res.status(404).json({ message: "Restaurant Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(deletedRestaurant),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
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
