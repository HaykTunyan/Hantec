import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    new Error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
