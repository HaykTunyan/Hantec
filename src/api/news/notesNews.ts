
import { newAPI } from "@/services/addintionlAxxios";
import axios from "axios";

interface NewsResponse {
  // Add appropriate fields based on your response structure
}

// Function to fetch news using query parameters
export async function getLatestNotices(
    limitSatart: number,
    limitLenght: number,
    lang: string,
    slug: string
  
): Promise<NewsResponse> {
  try {


    const params = new URLSearchParams({
        limit_start: limitSatart.toString(),
        limit_length: limitLenght.toString(),
        lang,
        slug,
      });

    const response = await newAPI.get<any>(
        `/api/GetLatestNotices?${params.toString()}`
      );

    return response.data;


  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error during fetching latest notices:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch latest notices due to server error");
    } else {
      console.error("Error during fetching latest notices:", error);
      throw new Error("Failed to fetch latest notices");
    }
  }
}