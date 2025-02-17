import { ObjectId, Schema, model } from "mongoose";

export type IUsers = {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const usersSchema = new Schema<IUsers>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Users = model("Users", usersSchema);

export default Users;
