export type IUser = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: "platform_admin" | "user" | "restaurant_user";
};
