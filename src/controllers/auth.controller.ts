import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { comparePasswords, hashPassword } from "../utils/PasswordHashBcrypt";
import {
  CheckEmailRequestBodyDTO,
  CheckEmailResponseBodyDTO,
  ForgotPasswordRequestBodyDTO,
  LoginRequestBodyDTO,
  LoginResponseBodyDTO,
  SignupRequestBodyDTO,
  SignupResponseBodyDTO,
} from "../dto/auth.dto";
import { CommonResponseDTO } from "../dto/common.dto";
import { IUser } from "../models/user.model";
import { sendForgotPasswordEmail } from "../services/email-template.service";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const checkEmail = async (
  req: Request<
    unknown,
    CommonResponseDTO<CheckEmailResponseBodyDTO>,
    CheckEmailRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<CheckEmailResponseBodyDTO>>,
) => {
  try {
    const existingUser = await usersService.findOne({
      email: req.body.email,
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Successful",
      data: {
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      },
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const login = async (
  req: Request<
    unknown,
    CommonResponseDTO<LoginResponseBodyDTO>,
    LoginRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<LoginResponseBodyDTO>>,
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await usersService.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await comparePasswords(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { firstName: existingUser.firstName, role: existingUser.role },
      SECRET_KEY,
    );
    res.status(200).json({
      message: "Authenticated",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const signup = async (
  req: Request<
    unknown,
    CommonResponseDTO<SignupResponseBodyDTO>,
    SignupRequestBodyDTO
  >,
  res: Response<CommonResponseDTO<SignupResponseBodyDTO>>,
) => {
  try {
    const existingUser = await usersService.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(403).json({
        message: "User already exists",
      });
      return;
    }
    if (req.body.role === "admin") {
      if (!req.user || req.user.role !== "admin") {
        res.status(403).json({
          message: "Only admin users can create admin accounts",
        });
        return;
      }
    }

    const role = req.body.role || "user";

    const hashedPassword = hashPassword(req.body.password);

    const createdUser = await usersService.createNew({
      ...req.body,
      password: hashedPassword,
      role,
    });

    const { password, ...responseUser } = createdUser;

    const token = jwt.sign(
      { firstName: createdUser.firstName ?? "" },
      SECRET_KEY,
    );

    res.status(201).json({
      message: "Success",
      data: {
        token,
        user: responseUser,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

export const forgotPassword = async (
  req: Request<unknown, CommonResponseDTO<void>, ForgotPasswordRequestBodyDTO>,
  res: Response<CommonResponseDTO<void>>,
) => {
  try {
    let existingUser: IUser | null;
    existingUser = await usersService.findOne({
      email: req.body.username,
    });

    if (!existingUser) {
      existingUser = await usersService.findOne({
        phone: req.body.username,
      });
    }

    if (existingUser) {
      // user is found
      // therefore need to send the forgot password email

      sendForgotPasswordEmail(existingUser.email);
    }

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};
