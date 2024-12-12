// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw

import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from "react-toastify";

interface WithdrawSend {
  accountCcy: string;
  accountCode: string;
  bankAccNo: string;
  // bankLocation: string;
  bankName: string;
  companyId: number;
  maxWithdrawalAmt: number;
  outputCcy: string;
  paymentMethod: string;
  platform: number;
  region: string;
  remarks: string;
  tradingAccountId: number;
  userType: string;
  withdrawalAmt: number;
}

export const PaymentGatewaySendUSDT = async (data: WithdrawSend) => {
  try {
    const response = await requestAPI.post(
      `/api/ps/payment-gateway/v1/withdraw`,
      data
    );
    return response.data;
  } catch (error) {
    const errorMessage = "Try on 24 hours later";
    toast.error(errorMessage);
    if (axios.isAxiosError(error)) {
      const axiosMessages = error?.response?.data?.msg;

      toast.error(axiosMessages);
      throw new Error(
        "Failed to fetch bank info due to server error",
        error.response?.data || error.message
      );
    } else {
      throw new Error("Failed to fetch bank info");
    }
  }
};
