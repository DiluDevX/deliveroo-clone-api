import axios from "axios";
import { CommonResponseDTO } from "../dto/common.dto";
import {
  CheckEmailResponseBodyDTO,
  ForgotPasswordResponseBodyDTO,
  LoginRequestBodyDTO,
  LoginResponseBodyDTO,
  LogoutRequestBodyDTO,
  RefreshTokenResponseBodyDTO,
  ResetPasswordResponseBodyDTO,
  SignupRequestBodyDTO,
  SignupResponseBodyDTO,
} from "../dto/auth.dto";
import {
  CreateUserRequestBodyDTO,
  CreateUserResponseBodyDTO,
  DeleteUserResponseBodyDTO,
  GetAllUsersResponseBodyDTO,
  GetSingleUserResponseBodyDTO,
  UpdateUserRequestBodyDTO,
  UpdateUserResponseBodyDTO,
} from "../dto/user.dto";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

if (!AUTH_SERVICE_URL) {
  throw new Error("AUTH_SERVICE_URL is not defined");
}

const API_KEY = process.env.AUTH_API_KEY;

const authClient = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export const authService = {
  Auth: {
    checkEmail: async (email: string) => {
      const response = await authClient.post<
        CommonResponseDTO<CheckEmailResponseBodyDTO>
      >("/auth/check-email", { email });
      return response.data;
    },
    signup: async (data: SignupRequestBodyDTO) => {
      const response = await authClient.post<
        CommonResponseDTO<SignupResponseBodyDTO>
      >("/auth/signup", data);
      return response.data;
    },
    login: async (data: LoginRequestBodyDTO) => {
      const response = await authClient.post<
        CommonResponseDTO<LoginResponseBodyDTO>
      >("/auth/login", data);
      return response.data;
    },
    logOut: async (data: LogoutRequestBodyDTO) => {
      const response = await authClient.post<CommonResponseDTO<null>>(
        "/auth/logout",
        data,
      );
      return response.data;
    },

    refresh: async (refreshToken: string) => {
      const response = await authClient.post<
        CommonResponseDTO<RefreshTokenResponseBodyDTO>
      >("/auth/refresh", {
        refreshToken,
      });
      return response.data;
    },
    forgotPassword: async (email: string) => {
      const response = await authClient.post<
        CommonResponseDTO<ForgotPasswordResponseBodyDTO>
      >("/auth/forgot-password", {
        email,
      });
      return response.data;
    },
    resetPassword: async (token: string, password: string) => {
      const response = await authClient.post<
        CommonResponseDTO<ResetPasswordResponseBodyDTO>
      >("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    },
  },
  Users: {
    getAll: async () => {
      const response =
        await authClient.get<CommonResponseDTO<GetAllUsersResponseBodyDTO>>(
          "/auth/users",
        );
      return response.data;
    },
    getSingle: async (userId: string) => {
      const response = await authClient.get<
        CommonResponseDTO<GetSingleUserResponseBodyDTO>
      >(`/auth/users/${userId}`);
      return response.data;
    },
    create: async (data: CreateUserRequestBodyDTO) => {
      const response = await authClient.post<
        CommonResponseDTO<CreateUserResponseBodyDTO>
      >("/auth/users", data);
      return response.data;
    },
    update: async (data: UpdateUserRequestBodyDTO) => {
      const response = await authClient.put<
        CommonResponseDTO<UpdateUserResponseBodyDTO>
      >("/auth/users", data);
      return response.data;
    },
    delete: async (userId: string) => {
      const response = await authClient.delete<
        CommonResponseDTO<DeleteUserResponseBodyDTO>
      >(`/auth/users/${userId}`);
      return response.data;
    },
  },
};

export default authService;
