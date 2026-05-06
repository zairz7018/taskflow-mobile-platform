export type Role = "CLIENT" | "EMPLOYE";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  speciality?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: Role;
  fullName: string;
  email: string;
}

