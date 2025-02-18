import { usersService } from "../services/users.service";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

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
  getAnUser,
  updateAnUserPartially,
  updateAnUserFully,
  deleteAnUser,
};
