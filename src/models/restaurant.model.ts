import { ObjectId, Schema, model } from "mongoose";

export interface IOperatingHours {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  openAt: string;
  closeAt: string;
  isOpen: boolean;
}

export interface IRestaurant {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  description?: string;
  tags: string[];
  operatingHours: IOperatingHours[];
  minimumValue: string;
  deliveryCharge: string;
  commissionPercentage: number;
  cuisine: string;
  rating: number;
  status: "active" | "disabled";
}

const operatingHoursSchema = new Schema<IOperatingHours>(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    openAt: {
      type: String,
      required: true,
    },
    closeAt: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

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
    operatingHours: [operatingHoursSchema],
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
