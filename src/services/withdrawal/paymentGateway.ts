// https://rinex-portal-uat.hantecgroup.com/api/fcs/v2/payment-gateway/all?companyId=20

import { requestAPI } from "../globalAxios";
import axios from "axios";

export const fetchPaymentGateways = async (companyId: number) => {
  try {
    const response = await requestAPI.get(`/api/fcs/v2/payment-gateway/all`, {
      params: { companyId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch payment gateways: ${error.message}`);
    } else {
      throw new Error("Failed to fetch payment gateways");
    }
  }
}
