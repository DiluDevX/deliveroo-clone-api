import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
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
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "OK",
      data: ordersArray.map(order => ({
        ...order,
        restaurantId: order.restaurantId.toString(),
      })),
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
    res.status(HttpStatusCode.Created).json({
      success: true,
      message: "Order Created",
      data: {
        ...newOrder,
        restaurantId: newOrder.restaurantId.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getAllOrders, createOrder };
