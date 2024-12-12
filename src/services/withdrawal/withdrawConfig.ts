// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v2/withdraw-config/read

import { AxiosError } from "axios";
import { requestAPI } from "../globalAxios";

interface ConfigProps {
  companyId: number;
  isActive: boolean;
  region: string;
  userType: string;
}

export async function fetchConfigWithdraw({
  companyId,
  isActive,
  region,
  userType,
}: ConfigProps): Promise<any> {
  try {
    const response = await requestAPI.get(`/api/ps/payment-gateway/v2/withdraw-config/read`, {
      params: {
        companyId,
        isActive,
        region,
        userType,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch withdraw config: ${error.response?.status} - ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred while fetching withdraw config.");
    }
  }
}
