import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.micro.service";
import { AxiosError, HttpStatusCode } from "axios";
import {
  CreateUserRequestBodyDTO,
  GetAllUsersResponseBodyDTO,
  GetSingleUserRequestParamsDTO,
  GetSingleUserResponseBodyDTO,
  CreateUserResponseBodyDTO,
  UpdateUserRequestParamsDTO,
  UpdateUserRequestBodyDTO,
  UpdateUserResponseBodyDTO,
  DeleteUserRequestParamsDTO,
  DeleteUserResponseBodyDTO,
} from "../dto/user.dto";
import { CommonResponseDTO } from "../dto/common.dto";

export const getAllUsers = async (
  _req: Request,
  res: Response<CommonResponseDTO<GetAllUsersResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Users.getAll();
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const getAnUser = async (
  req: Request<GetSingleUserRequestParamsDTO>,
  res: Response<CommonResponseDTO<GetSingleUserResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Users.getSingle(req.params.id);
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const createUser = async (
  req: Request<unknown, unknown, CreateUserRequestBodyDTO>,
  res: Response<CommonResponseDTO<CreateUserResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Users.create(req.body);
    res.status(HttpStatusCode.Created).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const updateAnUserPartially = async (
  req: Request<UpdateUserRequestParamsDTO, unknown, UpdateUserRequestBodyDTO>,
  res: Response<CommonResponseDTO<UpdateUserResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Users.update({
      ...req.body,
      id: req.params.id,
    });
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};

export const deleteAnUser = async (
  req: Request<DeleteUserRequestParamsDTO>,
  res: Response<CommonResponseDTO<DeleteUserResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await authService.Users.delete(req.params.id);
    res.status(HttpStatusCode.Ok).json(result);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      next(error);
    }
  }
};
