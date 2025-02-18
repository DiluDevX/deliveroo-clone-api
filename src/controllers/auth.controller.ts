import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { comparePasswords, hashPassword } from "../utils/PasswordHashBcrypt";
import {
  CheckEmailRequestBody,
  CheckEmailResponseBody,
  CreateNewUserRequestBody,
  CreateNewUserResponseBody,
  LoginUserRequestBody,
  LoginUserResponseBody,
} from "../dto/auth.dto";
import { CommonResponseDTO } from "../dto/common.dto";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const checkEmail = async (
  req: Request<CheckEmailRequestBody>,
  res: Response<CommonResponseDTO<CheckEmailResponseBody>>,
) => {
  try {
    const existingUser = await usersService.findOne({ email: req.body.email });

    if (!existingUser) {
      res
        .status(404)
        .json({ message: "Email not found. Please create an account." });

      return;
    }

    const token = jwt.sign({ firstName: existingUser.firstName }, SECRET_KEY);

    res.status(200).json({ message: "Successful", token });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const logInUser = async (
  req: Request<LoginUserRequestBody>,
  res: Response<CommonResponseDTO<LoginUserResponseBody>>,
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await usersService.findOne({ email });

    if (!existingUser) {
      res
        .status(404)
        .json({ message: "Email not found.Please Create An Account" });

      return;
    }
    const checkPassword = await comparePasswords(
      password,
      existingUser.password,
    );

    if (!checkPassword) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ firstName: existingUser.firstName }, SECRET_KEY);

    res.status(200).json({
      message: "Authenticated",
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });

    return;
  }
};

export const createNewUser = async (
  req: Request<CreateNewUserRequestBody>,
  res: Response<CommonResponseDTO<CreateNewUserResponseBody>>,
) => {
  try {
    const existingUser = await usersService.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists. Please Log In",
      });
      return;
    } else {
      const hashedPassword = hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const createdUser = await usersService.createNew({ ...req.body });

      const token = jwt.sign(
        { firstName: createdUser.firstName ?? "" },
        SECRET_KEY,
      );

      res.status(201).json({
        data: createdUser,
        token: token,
        message: "Success",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });

    return;
  }
};
