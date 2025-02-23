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
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
