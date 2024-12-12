// import { requestAPI } from "../globalAxios";
// import axios from "axios";
// import { toast } from 'react-toastify';

// interface AssetsDataResponse {
//   platformIdListInStr: string;
//   accountCodeListInStr: string;
//   otherStartIdx: number;
// }

// export async function getAssetsData(
//   platformIdListInStr: string,
//   accountCodeListInStr: string,
//   otherStartIdx: number
// ): Promise<AssetsDataResponse> {
//   try {
//     const response = await requestAPI.get(`/api/cs/report/trade-distribution`, {
//       params: {
//         platformIdListInStr,
//         accountCodeListInStr,
//         otherStartIdx,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
//       // toast.error(errorMessage);
//       // Handle Axios error
//       throw new Error(
//         `Failed to fetch user overview due to server error: ${error.response?.data || error.message}`
//       );
//     } else {
//       // Handle non-Axios error
//        // @ts-ignore
//       throw new Error(`Failed to fetch user overview: ${error.message}`);
//     }
//   }
// }

import { requestAPI } from "../globalAxios";
import axios from "axios";
// import { toast } from "react-toastify";

interface AssetsDataResponse {
  platformIdListInStr: string;
  accountCodeListInStr: string;
  otherStartIdx: number;
}

export async function getAssetsData(
  platformIdListInStr: string,
  accountCodeListInStr: string,
  otherStartIdx: number
): Promise<AssetsDataResponse> {
  try {
    const response = await requestAPI.get<AssetsDataResponse>(
      `/api/cs/report/trade-distribution`,
      {
        params: {
          platformIdListInStr,
          accountCodeListInStr,
          otherStartIdx,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        "An unexpected server error occurred.";
      // toast.error(errorMessage);
      throw new Error(`Server error: ${errorMessage}`);
    } else {
      const errorMessage = (error as Error).message || "An unexpected error occurred.";
      // toast.error(errorMessage);
      throw new Error(`Unknown error: ${errorMessage}`);
    }
  }
}
