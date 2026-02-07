import Finance, { IFinance } from "../models/finance.model";
import Order from "../models/order.model";
import Restaurant from "../models/restaurant.model";

const calculatePlatformRevenue = async (): Promise<number> => {
  const totalPlatformRevenue = await Finance.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$platformCommission" },
      },
    },
  ]);
  return totalPlatformRevenue[0]?.total || 0;
};

const getAllFinanceRecords = async (): Promise<IFinance[]> => {
  return Finance.find();
};

export const getDashboardStats = async () => {
  try {
    const stats = await Finance.aggregate([
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurantData",
        },
      },
      {
        $unwind: { path: "$restaurantData", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: null,
          totalPlatformRevenue: { $sum: "$totalRevenue" }, // Total order amount
          totalCommission: { $sum: "$platformCommission" }, //  platform keeps
          restaurantPayoutMade: { $sum: "$amountPaid" }, //  been paid
          pendingPayoutAmount: { $sum: "$pendingAmount" }, //  still owed
          restaurantCount: { $sum: 1 },
          avgCommissionPerRestaurant: { $avg: "$platformCommission" },
        },
      },
    ]);

    const pendingFinanceRecords = await Finance.find({
      status: "pending",
    });

    const pendingPayouts = await Promise.all(
      pendingFinanceRecords.map(async (record) => {
        const result = await Restaurant.findById(record.restaurantId);
        return {
          restaurantName: result?.name,
          restaurantId: record.restaurantId,
          amountDue: record.pendingAmount,
          status: record.status,
        };
      }),
    );

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate({
        path: "restaurantId",
        select: "name",
      })
      .populate({
        path: "userId",
        select: "name",
      });

    const topRestaurants = await Finance.aggregate([
      { $sort: { totalRevenue: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $unwind: "$restaurant" },
      {
        $project: {
          "restaurant.name": 1,
          totalRevenue: 1,
          platformCommission: 1,
        },
      },
    ]);

    return {
      data: {
        stats: stats[0] || {
          totalPlatformRevenue: 0,
          totalCommission: 0,
          restaurantPayoutMade: 0,
          pendingPayoutAmount: 0,
          restaurantCount: 0,
          avgCommissionPerRestaurant: 0,
        },
        recentOrders,
        topRestaurants,
        pendingPayouts,
      },
    };
  } catch {
    return { error: "Failed to fetch stats" };
  }
};

const createFinanceRecord = async (
  data: Partial<IFinance>,
): Promise<IFinance> => {
  const newFinanceRecord = new Finance({
    restaurantId: data.restaurantId,
    totalRevenue: 0,
    platformCommission: 0,
    commissionPercentage: 10,
    amountDue: 0,
    amountPaid: 0,
    pendingAmount: 0,
    status: "pending",
  });
  return await newFinanceRecord.save();
};

export const financeService = {
  getDashboardStats,
  calculatePlatformRevenue,
  createFinanceRecord,
  getAllFinanceRecords,
};
