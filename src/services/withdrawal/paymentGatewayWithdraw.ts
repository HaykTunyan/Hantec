import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from "react-toastify";

interface WithdrawSend {
  accountCcy: string;
  accountCode: string;
  companyId: number;
  maxWithdrawalAmt: string | number;
  paymentMethod: string;
  platform: number;
  region: string;
  remarks: string;
  tradingAccountId: string;
  userType: string;
}

export const PaymentGatewaySend = async (body: any) => {
  try {
    // Send the request using your pre-configured axios instance
    const response = await requestAPI.post(
      `/api/ps/payment-gateway/v1/withdraw`,
      body,
      {
        headers: {
          'accept-language': 'en-US',
          'Content-Type': 'application/json', // You can add more headers if needed
        },
      }
    );



    // If the request is successful, return the data
    return response.data;
  } catch (error) {
    // An unexpected error occurred. Please try again later.
    let errorMessage = "";

    // Handle axios specific errors
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const serverMessage =
        error?.response?.data?.msg || "No specific message provided.";

      // Customize the error message based on status code or server message
      switch (statusCode) {
        case 400:
          errorMessage = "Invalid request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please log in and try again.";
          break;
        case 500:
          errorMessage = "Server error. Try again later.";
          break;
        default:
          errorMessage = serverMessage || errorMessage;
      }

      // Log specific error messages for debugging
      console.error(`Error: ${serverMessage || error.message}`);

      // Display error to the user
      toast.error(errorMessage);

      // Re-throw error for higher-level handling
      throw new Error(`Failed to process withdrawal request: ${serverMessage}`);
    } else {
      // Handle non-Axios errors
      toast.error(errorMessage);
      throw new Error("Failed to process withdrawal request.");
    }
  }
};
