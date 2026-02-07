export type IUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  restaurantId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: "platform_admin" | "user" | "restaurant_admin";
  status: "active" | "suspended";
  orderCount: number;
};
