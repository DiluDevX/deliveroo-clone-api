import { ObjectId, Schema, model } from "mongoose";

export interface IRestaurant {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  orgId: string;

  name: string;
  image: string;
  description?: string;
  tags: string[];
  openingAt: string;
  closingAt: string;
  minimumValue: string;
  deliveryCharge: string;
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
    minimumValue: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
