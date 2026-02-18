import { ObjectId, Schema, model } from "mongoose";

export interface IPayment {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  restaurantId: string;
  userId: string;
  amount: number;
  commissionPercentage: number;
  commissionValue: number;
  transferAmount: number;
  paymentMethod: "cash-on-delivery" | "card";
  status: "failed" | "success" | "pending";
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    commissionPercentage: {
      type: Number,
      required: true,
    },
    commissionValue: {
      type: Number,
      required: true,
    },
    transferAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash-on-delivery", "card"],
    },
    status: {
      type: String,
      required: true,
      enum: ["failed", "success", "pending"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Payment = model("Payment", paymentSchema);

export default Payment;
