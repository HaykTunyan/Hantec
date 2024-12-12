// https://rinex-portal-uat.hantecgroup.com/api/ss/bank/all

import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from "react-toastify";

interface BankItem {
  id: number;
  code: string;
  location: string;
  name: string;
  prefixCode: string;
  swiftCode: string;
}

interface Bank {
  msg: null;
  rtnCode: null;
  status: string;
  data: BankItem[];
}

export async function getAllBanks(): Promise<Bank[]> {
  try {
    const response = await requestAPI.get("/api/ss/bank/all");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error handling

      // const errorMessage =
      //   error.response?.data?.msg || "An unexpected error occurred.";
      // toast.error(errorMessage);
      throw new Error("Failed to fetch banks due to server error");
    } else {
      // Non-Axios error handling
      console.error("Error during fetching banks:", error);
      throw new Error("Failed to fetch banks");
    }
  }
}
