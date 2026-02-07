import Finance from "../models/finance.model";
import Order, { IOrder } from "../models/order.model";
import Restaurant from "../models/restaurant.model";
import { Types } from "mongoose";

const findAll = async (): Promise<IOrder[]> => {
  return Order.find().populate("restaurantId", "name");
};

const createOrder = async (data: Partial<IOrder>): Promise<IOrder> => {
  // Create new order
  const order = new Order(data);
  await order.save();

  if (!order.restaurantId) {
    throw new Error("Order must have a restaurantId");
  }

  // Update Restaurant totals
  await Restaurant.findByIdAndUpdate(order.restaurantId, {
    $inc: {
      totalOrders: 1,
      totalRevenue: order.totalAmount,
    },
  });

  // Update Finance record
  const finance = await Finance.findOne({
    restaurantId: new Types.ObjectId(order.restaurantId.toString()),
  });
  if (!finance) {
    throw new Error("Finance record not found for the restaurant");
  }
  const newTotalRevenue = finance.totalRevenue + order.totalAmount;
  const newPlatformCommission =
    newTotalRevenue * (finance.commissionPercentage / 100);
  const newAmountDue = newTotalRevenue - newPlatformCommission;
  const newPendingAmount = newAmountDue - finance.amountPaid;

  await Finance.findByIdAndUpdate(finance.id, {
    totalRevenue: newTotalRevenue,
    platformCommission: newPlatformCommission,
    amountDue: newAmountDue,
    pendingAmount: newPendingAmount,
  });

  return order;
};

export const orderService = {
  findAll,
  createOrder,
};
