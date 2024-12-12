import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from "react-toastify";

// Define the type for the transfer request body
interface TransferRequestBody {
  fmTradingAccountId: number;
  fmAccountCcy: string;
  fmAmt: number;
  toTradingAccountId: number;
  toAccountCcy: string;
  toAmt: number;
  userId: number;
  maxTransferAmt: number;
}

// Define the type of the response data if known
interface TransferResponse {
  [x: string]: string;
  // Replace with actual response fields
  success: string;
  message?: string | undefined | any;
}

export async function sendTransferMoney(
  transferDetails: TransferRequestBody
): Promise<TransferResponse> {
  try {
    const response = await requestAPI.post<TransferResponse>(
      `/api/fcs/transfer`,
      transferDetails
    );
    toast.success(" Succesfuly Transfer Money");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const errorMessage =
      //   error.response?.data?.msg || "An unexpected error occurred.";
      // toast.error(errorMessage);
      // Axios error handling
      //   console.error(
      //     "Axios error during sending transfer:",
      //     error.response?.data || error.message
      //   );
      throw new Error("Failed to send transfer due to server error");
    } else {
      // Non-Axios error handling
      //   console.error("Error during sending transfer:", error);
      throw new Error("Failed to send transfer");
    }
  }
}
