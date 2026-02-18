import { ObjectId, Schema, model } from "mongoose";

export interface IDish {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: ObjectId;
  name: string;
  description?: string;
  price: number;
  image: string;
  categoryId: ObjectId;
  isVegetarian: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
  tags?: "bestseller" | "new" | "special";
}

const dishSchema = new Schema<IDish>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryId: {
      ref: "Category",
      type: Schema.Types.ObjectId,
      required: true,
    },
    isVegetarian: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSpicy: {
      type: Boolean,
      required: false,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    tags: {
      type: String,
      enum: ["bestseller", "new", "special"],
      required: false,
    },
  },
  { timestamps: true },
);

const Dish = model("Dish", dishSchema);

export default Dish;
