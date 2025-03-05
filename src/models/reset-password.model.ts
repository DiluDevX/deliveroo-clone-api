import { Schema, model, Types, SchemaTypes } from "mongoose";

export type IPasswordResetToken = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  email: string;
  token: string;
  expiresAt: Date;
};

const passwordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    email: {
      type: String,
      ref: "User",
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const PasswordResetToken = model(
  "PasswordResetToken",
  passwordResetTokenSchema,
);

export default PasswordResetToken;
