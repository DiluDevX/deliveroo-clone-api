import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface IDish {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  description?: string;
  calories: number;
  price: number;
  category: ObjectId;
  restaurant: ObjectId;
}

const dishSchema = new Schema<IDish>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    calories: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: "Category",
    },
    restaurant: {
      type: SchemaTypes.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true },
);

const Dish = model("Dish", dishSchema);

export default Dish;
