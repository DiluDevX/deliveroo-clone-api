import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const UsersArray = await usersService.findAll();

    res.status(200).json({
      message: "OK",
      data: UsersArray,
    });
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await usersService.findOne({ email });

    if (!existingUser) {
      res
        .status(404)
        .json({ message: "Email not found.Please Create An Account" });

      return;
    }

    if (existingUser.password !== password) {
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await usersService.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists. Please Log In",
      });
      return;
    } else {
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

const getAnUser = async (_req: Request, res: Response) => {
  try {
    const foundRestaurant = await usersService.findOne({});

    if (!foundRestaurant) {
      res.status(404).json({
        message: "Restaurant Not found",
      });

      return;
    }

    res.status(200).json({
      message: "OK",
      data: foundRestaurant,
    });
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateAnUserFully = async (req: Request, res: Response) => {
  try {
    const updatedRestaurant = await usersService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedRestaurant) {
      res.status(404).json({
        message: "Restaurant Not found",
      });

      return;
    }

    res.status(200).json({
      message: "Updated Restaurant",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateAnUserPartially = async (req: Request, res: Response) => {
  try {
    const updatedRestaurant = await usersService.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    if (!updatedRestaurant) {
      res.status(404).json({
        message: "Restaurant Not found",
      });

      return;
    }

    res.status(200).json({
      message: "OK",
      data: updatedRestaurant,
    });
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteAnUser = async (req: Request, res: Response) => {
  try {
    const deletedRestaurant = await usersService.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedRestaurant) {
      res.status(404).json({
        message: "Restaurant Not found",
      });

      return;
    }

    res.status(200).json({
      message: "OK",
      data: deletedRestaurant,
    });
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export {
  getAllUsers,
  logInUser,
  createNewUser,
  getAnUser,
  updateAnUserPartially,
  updateAnUserFully,
  deleteAnUser,
};
