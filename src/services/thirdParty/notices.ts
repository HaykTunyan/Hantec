import axios from "axios";
import { newAPI } from "../addintionlAxxios"; // Correct the import path if necessary

// Define the fields of the response according to the API documentation
interface NoticeItem {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NoticeResponse {
  data: NoticeItem[]; // Adjust according to your actual response structure
  totalCount: number; // Example field for total count, if applicable
}

export async function getGetLatestNotices(
  limitSatart: number,
  limitLenght: number,
  lang: string,
  slug: string
): Promise<NoticeResponse> {
  try {
    // Use URLSearchParams to format the query string
    const params = new URLSearchParams({
      limit_start: limitSatart.toString(),
      limit_length: limitLenght.toString(),
      lang,
      slug,
    });

    const response = await newAPI.get<NoticeResponse>(
      `/api/GetLatestNotices?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error handling
      // console.error(
      //   "Axios error during fetching latest notices:",
      //   error.response?.data || error.message
      // );
      throw new Error("Failed to fetch latest notices due to server error");
    } else {
      // Non-Axios error handling
      // console.error("Error during fetching latest notices:", error);
      throw new Error("Failed to fetch latest notices");
    }
  }
}
