import { Request, Response } from "express";
import { orderService } from "../services/order.service";

const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const ordersArray = await orderService.findAll();
    res.status(200).json({
      message: "OK",
      data: ordersArray,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json({
      message: "Order Created",
      data: newOrder,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllOrders, createOrder };
