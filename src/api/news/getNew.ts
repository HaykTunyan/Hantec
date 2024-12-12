import { requestAPI } from "@/services/globalAxios";
import { newAPI } from "@/services/addintionlAxxios";
import axios from "axios";

// Define the type for the function response and payload (adjust as needed)
interface NewsResponse {
  // Add appropriate fields based on your response structure
}

interface NewsPayload {
  category: string;
  company: string;
  page: number;
}

// https://www.hantecgroup.com/api/GetLatestNotices?limit_start=0&limit_length=8&lang=en_US&slug=hf-web 

// Update the function to accept a payload
export async function getNews(payload: NewsPayload): Promise<NewsResponse> {
  try {
    const response = await newAPI.post(`/api/cs/news`, {
      category: payload.category,
      company: payload.company,
      page: payload.page,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error during fetching news information:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch news due to server error");
    } else {
      console.error("Error during fetching news overview:", error);
      throw new Error("Failed to fetch news overview");
    }
  }
}
