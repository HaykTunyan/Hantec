import axios from 'axios';
import { handleUnauthorizedError } from '@/auth/authHelpers';
import { toast } from 'react-toastify';

export const clientAPI = axios.create({
  baseURL: "https://rinex-portal-uat.hantecgroup.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

clientAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Logging for debugging purposes
    return Promise.reject(error);
  }
);

clientAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;

      if (statusCode === 401) {
        // Handle unauthorized access
        handleUnauthorizedError();
        return Promise.reject({ ...error, shouldRedirect: true });
      }

      if (statusCode && statusCode !== 200) {
        // const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        // toast.error(errorMessage);
        return Promise.reject(error.response?.data);
      }
    }

    return Promise.reject(error);
  }
);
