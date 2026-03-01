import Order, { IOrder } from "../models/order.model";
import Restaurant from "../models/restaurant.model";
import Cart from "../models/cart.model";
import { createPaymentRecord } from "./payment.service";
import { ObjectId } from "mongodb";

interface CreateOrderInput extends Omit<Partial<IOrder>, "restaurantId"> {
  restaurantId: string;
  userId: string;
  paymentMethod: "cash-on-delivery" | "card";
}

const findAll = async (): Promise<IOrder[]> => {
  return Order.find().populate("restaurantId", "name");
};

const createOrder = async (
  data: Partial<CreateOrderInput>,
): Promise<IOrder> => {
  if (!data.restaurantId || !data.userId || !data.paymentMethod) {
    throw new Error("Order must have restaurantId, userId and a paymentMethod");
  }

  const order = new Order(data);
  await order.save();

  const restaurantObjectId = new ObjectId(data.restaurantId);
  await Restaurant.findByIdAndUpdate(restaurantObjectId, {
    $inc: {
      totalOrders: 1,
      totalRevenue: order.totalAmount,
    },
  });

  await createPaymentRecord({
    _id: order._id,
    restaurantId: data.restaurantId.toString(),
    userId: order.userId,
    amount: order.totalAmount,
    paymentMethod: data.paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: order._id.toString(),
    commissionPercentage: 0,
    status: "pending",
    commissionValue: 0,
    transferAmount: 0,
  });

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
