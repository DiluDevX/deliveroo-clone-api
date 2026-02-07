import { ObjectId, Schema, model } from "mongoose";

export interface IRestaurant {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  orgId: string;
  adminId: string;
  name: string;
  image: string;
  description?: string;
  tags: string[];
  openingAt: string;
  closingAt: string;
  minimumValue: string;
  deliveryCharge: string;
  cuisine: string;
  rating: number;
  totalOrders: number;
  totalRevenue: number;
  status: "active" | "disabled";
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    tags: [String],
    openingAt: {
      type: String,
      required: true,
    },
    closingAt: {
      type: String,
      required: true,
    },
    orgId: {
      type: String,
      required: true,
      unique: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    minimumValue: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    totalOrders: {
      type: Number,
      required: false,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "disabled"],
    },
  },
  { timestamps: true },
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
