import { model, ObjectId, Schema } from "mongoose";

export interface ICartItem {
  dishId: string;
  quantity: number;
}

export interface ICart {
  _id: ObjectId;
  userId: string;
  restaurantId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    dishId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

const Cart = model("Cart", cartSchema);

export default Cart;
