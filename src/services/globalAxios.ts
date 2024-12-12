import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

// Get API base URL from environment variables
// NEXT_PUBLIC_API_URL=https://rinex-portal-uat.hantecgroup.com
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Create Axios instance with default config
export const requestAPI = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Handles the logic for unauthorized access (401).
 * - Clears relevant tokens from localStorage.
 * - Displays a session expired message.
 * - Redirects the user to the login page.
 */
const handleUnauthorizedError = (router: ReturnType<typeof useRouter>): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id");
  toast.error("Your session has expired. Redirecting to login...");

  // Redirect the user to the login page
  router.push('/login');
};



requestAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    toast.error("An error occurred while sending the request.");
    return Promise.reject(error);
  }
);


requestAPI.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {

    if (error.response && error.response.status === 401) {

      

      localStorage.clear();
      const router = useRouter();
      router.replace('/login');
    }
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      
      if (statusCode === 401) {
   
        const router = useRouter();
        handleUnauthorizedError(router);
        
        return Promise.reject({ ...error, shouldRedirect: true });
      }

 
      if (statusCode && statusCode !== 200) {
        return Promise.reject(error.response?.data);
      }
    }
    return Promise.reject(error);
  }
);
