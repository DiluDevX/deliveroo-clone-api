import { model, ObjectId, Schema } from "mongoose";

export interface IOrder {
  id: string;
  restaurantId: ObjectId;
  userId: string;
  items: {
    dish: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Done" | "Pending" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

const orderSchema = new Schema<IOrder>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    restaurantId: {
      ref: "Restaurant",
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        dish: {
          ref: "Dish",
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Done", "Pending", "Cancelled"],
    },
  },
  { timestamps: true },
);

const Order = model("Order", orderSchema);

export default Order;
