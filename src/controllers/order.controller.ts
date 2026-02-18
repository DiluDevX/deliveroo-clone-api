import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/order.service";
import {
  CreateOrderRequestBodyDTO,
  CreateOrderResponseBodyDTO,
  GetAllOrdersResponseBodyDTO,
} from "../dto/order.dto";
import { CommonResponseDTO } from "../dto/common.dto";

const getAllOrders = async (
  _req: Request<unknown, unknown, unknown>,
  res: Response<CommonResponseDTO<GetAllOrdersResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const ordersArray = await orderService.findAll();
    res.status(200).json({
      message: "OK",
      data: ordersArray,
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (
  req: Request<unknown, unknown, CreateOrderRequestBodyDTO>,
  res: Response<CommonResponseDTO<CreateOrderResponseBodyDTO>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json({
      message: "Order Created",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllOrders, createOrder };
