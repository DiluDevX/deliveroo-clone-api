import { ObjectId, Schema, model } from "mongoose";

export type IUser = {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  status: "Active" | "Suspended";
  orderCount: number;
};

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Suspended"],
      default: "Active",
    },
    orderCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
