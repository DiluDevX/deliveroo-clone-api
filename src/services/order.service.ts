import Order, { IOrder } from "../models/order.model";
import Restaurant from "../models/restaurant.model";
import Cart from "../models/cart.model";
import { createPaymentRecord } from "./payment.service";
import { ObjectId } from "mongoose";

interface CreateOrderInput extends Partial<IOrder> {
  restaurantId: ObjectId;
  userId: string;
  paymentMethod: "cash-on-delivery" | "card";
}

const findAll = async (): Promise<IOrder[]> => {
  return Order.find().populate("restaurantId", "name");
};

const createOrder = async (
  data: Partial<CreateOrderInput>,
): Promise<IOrder> => {
  // Validate required fields
  if (!data.restaurantId || !data.userId || !data.paymentMethod) {
    throw new Error("Order must have restaurantId, userId and a paymentMethod");
  }

  // Create new order
  const order = new Order(data);
  await order.save();

  // Update Restaurant totals
  await Restaurant.findByIdAndUpdate(order.restaurantId, {
    $inc: {
      totalOrders: 1,
      totalRevenue: order.totalAmount,
    },
  });

  // Create Payment record
  await createPaymentRecord({
    _id: order._id,
    restaurantId: data.restaurantId.toString(),
    userId: order.userId,
    amount: order.totalAmount,
    paymentMethod: data.paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: order._id,
    commissionPercentage: 0,
    commissionAmount: 0,
    status: "pending",
  });

  // Clear user's cart
  await Cart.findOneAndUpdate(
    { userId: order.userId },
    { $set: { items: [] } },
  );

  return order;
};

export const orderService = {
  findAll,
  createOrder,
};
