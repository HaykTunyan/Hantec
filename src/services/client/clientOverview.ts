import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from 'react-toastify';

interface UserOverviewResponse {
  clientId: number;
  clientName: string;
  tradeCount?: number;
  data: any;
}

export async function getUserOverview(
  // @ts-ignore check
): Promise<UserOverviewResponse> {
  try {
    const response = await requestAPI.get<UserOverviewResponse>(
      "/api/cs/client/overview",
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      toast.error(errorMessage);
      // Axios error handling
      new Error(
        "Axios error during fetching user overview:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        toast.error("Your Token is Expired , Please Log Out");
      }
      throw new Error("Failed to fetch user overview due to server error");
    } else {
      if (error) {
        // Non-Axios error handling
        new Error("Error during fetching user overview:", error);
        throw new Error("Failed to fetch user overview");
      }
    }
  }
}
