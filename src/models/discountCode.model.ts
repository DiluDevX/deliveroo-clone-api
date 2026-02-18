import { ObjectId, Schema, model } from "mongoose";

export interface IDiscountCode {
  _id: ObjectId;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  maxDiscountAmount: number;
  minOrderValue: number;
  validFrom: Date;
  validTill: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const discountCodeSchema = new Schema<IDiscountCode>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    maxDiscountAmount: {
      type: Number,
      required: true,
    },
    minOrderValue: {
      type: Number,
      required: true,
      default: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const DiscountCode = model("DiscountCode", discountCodeSchema);

export default DiscountCode;
