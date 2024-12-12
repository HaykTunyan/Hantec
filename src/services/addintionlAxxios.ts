import axios from 'axios';
import { handleUnauthorizedError } from '@/auth/authHelpers';
import { toast } from 'react-toastify';
// Import the utility function

// Create a new Axios instance with default configuration
export const newAPI = axios.create({
  baseURL: "https://www.hantecgroup.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

newAPI.interceptors.request.use(
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

newAPI.interceptors.response.use(
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
