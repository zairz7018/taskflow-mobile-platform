import apiClient from "./apiClient";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";
import type { UserProfile } from "../types/user";

export const authApi = {
  async login(request: LoginRequest): Promise<AuthResponse> {
    console.log("[api] POST /auth/login", { ...request, password: "<redacted>" });
    const response = await apiClient.post<AuthResponse>("/auth/login", request);
    return response.data;
  },

  async register(request: RegisterRequest): Promise<{ message: string }> {
    console.log("[api] POST /auth/register", { ...request, password: "<redacted>" });
    const response = await apiClient.post<{ message: string }>(
      "/auth/register",
      request
    );
    return response.data;
  },

  async getCurrentUser(): Promise<UserProfile> {
    console.log("[api] GET /users/me");
    const response = await apiClient.get<UserProfile>("/users/me");
    return response.data;
  },
};
