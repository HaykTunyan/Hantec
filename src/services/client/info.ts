import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from 'react-toastify';

// @ts-ignore
export async function getGetAccInfo(): Promise {
  try {
    const response = await requestAPI.get(
      `/api/acs/info`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      //     toast.error(errorMessage);
      // Axios error handling
      new Error(
        "Axios error during fetching user overview:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch user overview due to server error");
    } else {
      if(error) {
        // Non-Axios error handling
        new Error("Error during fetching user overview:", error);
        throw new Error("Failed to fetch user overview");
      }
    }
  }
}
