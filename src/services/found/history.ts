//  https://rinex-portal-uat.hantecgroup.com/api/cs/mt4report/margin?page=0&size=10

import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from 'react-toastify';

interface NoticeResponse {
  hostory: any[];
}

export async function getGetHistory(
  cltCode: string,
  dateFrom: string,
  dateTo: string,
  platformId: number,
  page: number,
  size: number
): Promise<NoticeResponse> {
  try {
    const response = await requestAPI.post<NoticeResponse>(
      `/api/cs/mt4report/margin`,
      {
        cltCode,
        dateFrom,
        dateTo,
        platformId,
      },
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error handling
      // console.error(
      //   "Axios error during fetching latest notices:",
      //   error.response?.data || error.message
      // );
      // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      // toast.error(errorMessage);
      throw new Error("Failed to fetch latest notices due to server error");
    } else {
      // Non-Axios error handling
      // console.error("Error during fetching latest notices:", error);
      throw new Error("Failed to fetch latest notices");
    }
  }
}
