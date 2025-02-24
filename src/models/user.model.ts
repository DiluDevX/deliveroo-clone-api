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
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
