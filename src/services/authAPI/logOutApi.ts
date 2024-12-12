import { AxiosResponse } from "axios";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export async function logOutUser(): Promise<any> {
    try {
        const response: AxiosResponse = await api.post("/api/acs/logout");
        return response.data;
    } catch (error) {
        if(error) {
            new Error("Error during logout:", error);
            throw new Error("Logout failed");
        }
    }
}
