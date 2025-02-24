import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  GetAllUsersResponseBodyDTO,
  GetAnUserResponseBodyDTO,
  UpdateUserFullyRequestBodyDTO,
  UpdateUserFullyResponseBodyDTO,
  UpdateUserPartiallyRequestBodyDTO,
  UpdateUserPartiallyResponseBodyDTO,
  DeleteUserResponseBodyDTO,
  UserResponseDTO,
} from "../dto/user.dto";
import { CommonResponseDTO, ObjectIdPathParamsDTO } from "../dto/common.dto";
import { IUser } from "../models/user.model";

dotenv.config();

const toResponseDTO = (user: IUser): UserResponseDTO => ({
  id: user._id.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone ?? undefined,
  role: user.role,
});

const getAllUsers = async (
  _req: Request,
  res: Response<CommonResponseDTO<GetAllUsersResponseBodyDTO>>,
) => {
  try {
    const usersArray = await usersService.findAll();
    res.status(200).json({
      message: "OK",
      data: usersArray.map(toResponseDTO),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAnUser = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<GetAnUserResponseBodyDTO>>,
) => {
  try {
    const foundUser = await usersService.findById(req.params.id);
    if (!foundUser) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(foundUser),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAnUserFully = async (
  req: Request<ObjectIdPathParamsDTO, unknown, UpdateUserFullyRequestBodyDTO>,
  res: Response<CommonResponseDTO<UpdateUserFullyResponseBodyDTO>>,
) => {
  try {
    const updatedUser = await usersService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
    res.status(200).json({
      message: "Updated User",
      data: toResponseDTO(updatedUser),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAnUserPartially = async (
  req: Request<
    ObjectIdPathParamsDTO,
    unknown,
    UpdateUserPartiallyRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<UpdateUserPartiallyResponseBodyDTO>>,
) => {
  try {
    const updatedUser = await usersService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(updatedUser),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAnUser = async (
  req: Request<ObjectIdPathParamsDTO>,
  res: Response<CommonResponseDTO<DeleteUserResponseBodyDTO>>,
) => {
  try {
    const deletedUser = await usersService.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User Not found" });
      return;
    }
    res.status(200).json({
      message: "OK",
      data: toResponseDTO(deletedUser),
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllUsers,
  getAnUser,
  updateAnUserPartially,
  updateAnUserFully,
  deleteAnUser,
};
