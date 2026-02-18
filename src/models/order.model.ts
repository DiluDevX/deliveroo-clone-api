import { model, ObjectId, Schema } from "mongoose";

export interface IOrderItems {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export interface IDiscount {
  _id: ObjectId;
  type: "percentage" | "fixed";
  code?: string;
  value: number;
  amount: number;
}

export interface IOrder {
  _id: ObjectId;
  id: string;
  restaurantId: ObjectId;
  userId: string;
  items: IOrderItems[];
  subtotal: number;
  discount?: IDiscount;
  tax: number;
  deliveryFee: number;
  totalAmount: number;
  status: "Done" | "Pending" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

const discountSchema = new Schema<IDiscount>(
  {
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderItemSchema = new Schema<IOrderItems>(
  {
    dishId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

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
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: discountSchema,
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
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
