import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const authenticateUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await usersService.findOne({ ...req.body });

    if (!existingUser) {
      res
        .status(404)
        .json({ message: "email not found.Please Create An Account" });

      return;
    }
    const token = jwt.sign({ firstName: existingUser.firstName }, SECRET_KEY);

    res.status(200).json({
      message: "Successful",
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export { authenticateUser };
