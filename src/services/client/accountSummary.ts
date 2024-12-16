import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from "react-toastify";

interface RequestParams {
  data(arg0: string, data: any): unknown;
  accountCodeListInStr: string;
  platformIdListInStr: string;
}

export async function getGetAccountSummary(
  accountCodeListInStr: string,
  platformIdListInStr: string
  //@ts-ignore check
): Promise<RequestParams> {
  try {
    const response = await requestAPI.get<RequestParams>(
      `/api/cs/report/account-summary`,
      {
        params: {
          accountCodeListInStr,
          platformIdListInStr,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.msg || "An unexpected error occurred.";
      toast.error(errorMessage);
      // Axios error handling
      new Error(
        "Axios error during fetching user overview:",
        error.response?.data || error.message
      );
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
