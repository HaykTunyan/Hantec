// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/payment-callback/hf/usdt

import { requestAPI } from "../globalAxios";
import axios from "axios";
import { toast } from 'react-toastify';

interface usdtSend  {
    paymentRef: string,
    txId: string
}

export const DepositUsdtSend = async ( body: any) => {
    try {
        const response = await requestAPI.post(`/api/ps/payment-gateway/v1/payment-callback/hf/usdt`, body);
        toast.success(" Succesfuly Send USDT");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
          // toast.error(errorMessage);
          throw new Error("Failed to fetch bank info due to server error");
        } else {
          throw new Error("Failed to fetch bank info");
        }
      }  
}