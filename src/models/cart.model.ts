import { model, Schema } from "mongoose";

const cartItemSchema = new Schema(
  {
    dishId: { type: String, required: true, ref: "Dish" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
  },
  { _id: false, timestamps: true },
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId || String,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    restaurantId: { type: String },
  },
  { timestamps: true },
);

const Cart = model("Cart", cartSchema);

export default Cart;
