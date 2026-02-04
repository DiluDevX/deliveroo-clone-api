import { model, Schema, Types } from "mongoose";

export interface IFinance {
  id: string;
  period: string;
  createdAt: string;
  updatedAt: string;
  restaurantId: Types.ObjectId;
  totalRevenue: number;
  platformCommission: number;
  commissionPercentage: number;
  amountDue: number;
  amountPaid: number;
  pendingAmount: number;
  payoutHistory: {
    amount: number;
    date: string;
    status: "pending" | "paid" | "failed";
  }[];
  lastPayoutDate: string;
  nextPayoutDate: string;
  status: "pending" | "paid";
}

const financeSchema = new Schema<IFinance>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      unique: true,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    platformCommission: {
      type: Number,
      default: 0,
    },
    commissionPercentage: {
      type: Number,
      default: 10,
    },
    amountDue: {
      type: Number,
      default: 0,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    pendingAmount: {
      type: Number,
      default: 0,
    },
    payoutHistory: [
      {
        amount: Number,
        date: Date,
        status: {
          type: String,
          enum: ["pending", "paid", "failed"],
          default: "pending",
        },
      },
    ],
    lastPayoutDate: Date,
    nextPayoutDate: Date,
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Finance = model("Finance", financeSchema);

export default Finance;
