import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { comparePasswords, hashPassword } from "../utils/PasswordHashBcrypt";
import {
  CheckEmailRequestBodyDTO,
  CheckEmailResponseBodyDTO,
  LoginRequestBodyDTO,
  LoginResponseBodyDTO,
  SignupRequestBodyDTO,
  SignupResponseBodyDTO,
} from "../dto/auth.dto";
import { CommonResponseDTO } from "../dto/common.dto";

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
    const existingUser = await usersService.findOne({ email: req.body.email });

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

    const token = jwt.sign({ firstName: existingUser.firstName }, SECRET_KEY);

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

    const hashedPassword = hashPassword(req.body.password);

    const createdUser = await usersService.createNew({
      ...req.body,
      password: hashedPassword,
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
