import Payment, { IPayment } from "../models/payment.model";
import Restaurant from "../models/restaurant.model";

export const createPaymentRecord = async (
  data: IPayment,
): Promise<IPayment> => {
  if (!data._id || !data.restaurantId || !data.userId) {
    throw new Error("Payment must have orderId, restaurantId and userId");
  }
  const restaurant = await Restaurant.findById(data.restaurantId);
  const commissionPercentage = restaurant?.commissionPercentage || 10;
  const commissionValue = (data.amount * commissionPercentage) / 100;
  const transferAmount = data.amount - commissionValue;
  const existingPayment = await Payment.findOne({ orderId: data._id });
  if (existingPayment) {
    return existingPayment;
  }
  const res = await Payment.create({
    orderId: data._id,
    restaurantId: data.restaurantId.toString(),
    userId: data.userId,
    amount: data.amount,
    commissionPercentage,
    commissionValue,
    transferAmount,
    paymentMethod: data.paymentMethod,
    status: "pending",
  });

  return res;
};
