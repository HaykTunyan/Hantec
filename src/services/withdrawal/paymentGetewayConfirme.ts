// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw/1341/confirm


import { requestAPI } from "../globalAxios";
import axios from "axios";

export const  PaymentGatewayConfirm  = async (confirmId: number)  =>  {
try {
    const response = await requestAPI.post(`/api/ps/payment-gateway/v1/withdraw/${confirmId}/confirm`,);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Failed to fetch bank info due to server error");
    } else {
      throw new Error("Failed to fetch bank info");
    }
  }  
}