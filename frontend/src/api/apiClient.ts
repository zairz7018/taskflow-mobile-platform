import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: "http://192.168.0.118:8082/api",
});

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("auth.token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const apiMessage = error?.response?.data?.message;

    if (status === 401) {
      if (onUnauthorized) {
        onUnauthorized();
      }
      return Promise.reject({
        status,
        message: apiMessage || "Session expired. Please login again.",
      });
    }

    if (status === 403) {
      return Promise.reject({
        status,
        message: apiMessage || "Access denied for this role.",
      });
    }

    if (status === 404) {
      return Promise.reject({
        status,
        message: apiMessage || "Resource not found.",
      });
    }

    if (status === 409) {
      return Promise.reject({
        status,
        message: apiMessage || "Conflict error.",
      });
    }

    if (status === 400) {
      return Promise.reject({
        status,
        message: apiMessage || "Invalid request.",
      });
    }

    if (error?.request) {
      return Promise.reject({
        status: 0,
        message:
          "Cannot connect to backend. Check Wi-Fi, backend server, and IP address.",
      });
    }

    return Promise.reject({
      status: status || 0,
      message: apiMessage || "Unexpected error. Please try again.",
    });
  }
);

export default apiClient;
