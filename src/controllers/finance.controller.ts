import { Request, Response } from "express";
import { Types } from "mongoose";
import { financeService } from "../services/finance.service";

const getPlatformRevenue = async (_req: Request, res: Response) => {
  try {
    const revenue = await financeService.calculatePlatformRevenue();
    res.status(200).json({
      message: "OK",
      data: { totalRevenue: revenue },
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRecords = async (_req: Request, res: Response) => {
  try {
    const records = await financeService.getAllFinanceRecords();
    res.status(200).json({
      message: "OK",
      data: records,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPlatformStats = async (_req: Request, res: Response) => {
  try {
    const stats = await financeService.getDashboardStats();
    res.status(200).json({
      message: "OK",
      data: stats.data,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createFinanceRecord = async (
  req: Request<
    unknown,
    unknown,
    {
      restaurantId: string;
      totalRevenue: number;
      platformCommission: number;
      commissionPercentage: number;
      amountDue: number;
      amountPaid: number;
      pendingAmount: number;
      status: "pending" | "paid";
    }
  >,
  res: Response,
) => {
  try {
    const {
      restaurantId,
      totalRevenue,
      platformCommission,
      commissionPercentage,
      amountDue,
      amountPaid,
      pendingAmount,
      status,
    } = req.body;
    const newFinanceRecord = await financeService.createFinanceRecord({
      restaurantId: new Types.ObjectId(restaurantId),
      totalRevenue,
      platformCommission,
      commissionPercentage,
      amountDue,
      amountPaid,
      pendingAmount,
      status,
    });
    res.status(201).json({
      message: "Finance record created",
      data: newFinanceRecord,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getPlatformStats,
  getPlatformRevenue,
  createFinanceRecord,
  getAllRecords,
};
