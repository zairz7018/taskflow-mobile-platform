import React, { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../api/authApi";
import { setUnauthorizedHandler } from "../api/apiClient";
import type { AuthResponse, LoginRequest, RegisterRequest, Role } from "../types/auth";

export interface AuthState {
  token: string | null;
  role: Role | null;
  fullName: string | null;
  email: string | null;
}

export interface AuthContextValue {
  auth: AuthState;
  loading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<string>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  token: null,
  role: null,
  fullName: null,
  email: null,
};

export const AuthContext = createContext<AuthContextValue>({
  auth: initialState,
  loading: true,
  login: async () => undefined,
  register: async () => "",
  logout: async () => undefined,
});

const STORAGE_KEYS = {
  token: "auth.token",
  role: "auth.role",
  fullName: "auth.fullName",
  email: "auth.email",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      void clearSession();
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  useEffect(() => {
    void restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const [token, role, fullName, email] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.token),
        AsyncStorage.getItem(STORAGE_KEYS.role),
        AsyncStorage.getItem(STORAGE_KEYS.fullName),
        AsyncStorage.getItem(STORAGE_KEYS.email),
      ]);

      if (token && role && fullName && email) {
        setAuthState({
          token,
          role: role as Role,
          fullName,
          email,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const persistSession = async (response: AuthResponse) => {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.token, response.token],
      [STORAGE_KEYS.role, response.role],
      [STORAGE_KEYS.fullName, response.fullName],
      [STORAGE_KEYS.email, response.email],
    ]);

    setAuthState({
      token: response.token,
      role: response.role,
      fullName: response.fullName,
      email: response.email,
    });
  };

  const clearSession = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.token,
      STORAGE_KEYS.role,
      STORAGE_KEYS.fullName,
      STORAGE_KEYS.email,
    ]);
    setAuthState(initialState);
  };

  const login = async (request: LoginRequest) => {
    const response = await authApi.login(request);
    await persistSession(response);
  };

  const register = async (request: RegisterRequest) => {
    const response = await authApi.register(request);
    return response.message;
  };

  const logout = async () => {
    await clearSession();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      loading,
      login,
      register,
      logout,
    }),
    [auth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
