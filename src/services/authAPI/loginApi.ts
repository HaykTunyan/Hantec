import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function loginUser(loginData: {
  type: string;
  companyId: number;
  applicationId: number;
  loginId: string;
  password: string;
}) {
  try {
    const response = await api.post("/api/acs/login", loginData);
    return response.data;
  } catch (error) {
    if (error) {
      toast.error("Error during login");
      throw new Error("Login failed", error);
      //@ts-ignore
      return error.response.data;
    }
  }
}
