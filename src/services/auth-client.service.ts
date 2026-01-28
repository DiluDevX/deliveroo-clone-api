import axios from "axios";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

if (!AUTH_SERVICE_URL) {
  throw new Error("AUTH_SERVICE_URL is not defined");
}

const API_KEY = process.env.AUTH_API_KEY;

const authClient = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { "api-key": API_KEY } : {}),
  },
});

// Debug: Log cookies from auth service
authClient.interceptors.response.use(
  (response) => {
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      console.log("🍪 Cookies received from auth service:", setCookieHeader);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  checkEmail: async (email: string) => {
    const response = await authClient.post("/auth/check-email", { email });
    return response.data;
  },

  signup: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role?: "admin" | "user";
  }) => {
    const response = await authClient.post("/auth/signup", data);
    return response;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await authClient.post("/auth/login", data);
    return response;
  },

  authStatus: async () => {
     await authClient.get("/auth/me");
    return
  },

  refresh: async (refreshToken: string) => {
    const response = await authClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await authClient.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  resetPassword: async (email: string, token: string, password: string) => {
    const response = await authClient.post("/auth/reset-password", {
      email,
      token,
      password,
    });
    return response.data;
  },
};

export default authService;
