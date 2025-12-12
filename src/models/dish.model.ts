import { model, ObjectId, Schema, SchemaTypes } from "mongoose";

export interface IDish {
  name: string;
  description?: string;
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
