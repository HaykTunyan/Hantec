// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/withdraw-limit?tradingAccountId=28128&paymentMethod=USDTA&accountCode=367000052&accountCcy=USD&region=AFRICA&companyId=20&coCode=HF&platform=42&userType=CLIENT

import { AxiosError } from "axios";
import { requestAPI } from "../globalAxios";

interface WithdrawLimitParams {
  tradingAccountId: number;
  paymentMethod: string;
  accountCode: string;
  accountCcy: string;
  region: string;
  companyId: number;
  coCode: string;
  platform: number;
  userType: string;
}

export async function fetchWithdrawLimitValueInfo({
  tradingAccountId,
  paymentMethod,
  accountCode,
  accountCcy,
  region,
  companyId,
  coCode,
  platform,
  userType,
}: WithdrawLimitParams): Promise<any> {
  try {
    const response = await requestAPI.get(
      `/api/ps/payment-gateway/v1/withdraw-limit`,
      {
        params: {
          tradingAccountId,
          paymentMethod,
          accountCode,
          accountCcy,
          region,
          companyId,
          coCode,
          platform,
          userType,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to fetch withdraw config: ${error.response?.status} - ${error.message}`
      );
    } else {
      throw new Error(
        "An unexpected error occurred while fetching withdraw config."
      );
    }
  }
}
