import axios from "axios";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL;

const authClient = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  signup: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role?: "admin" | "user";
  }) => {
    const response = await authClient.post("/auth/signup", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await authClient.post("/auth/login", data);
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await authClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  forgotPassword: async (userName: string) => {
    const response = await authClient.post("/auth/forgot-password", {
      userName,
    });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await authClient.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  verifyToken: async (token: string) => {
    const response = await authClient.post("/auth/verify-token", { token });
    return response.data;
  },
};

export default authService;
