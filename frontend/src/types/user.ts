import type { Role } from "./auth";

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  speciality?: string | null;
}

