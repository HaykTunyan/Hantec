// https://rinex-portal-uat.hantecgroup.com/api/as/mobile-money

import { requestAPI } from "../globalAxios";
import axios from "axios";
// import { toast } from 'react-toastify';

interface messageMapp {
    statusId: number,
    messageId: string,
}

interface MobileMoneyInfo {
    appDate: number;
    clientUserId: number;
    companyId: string;
    walletCcy : string;
    walletLocation: string;
    walletMobile: string;
    walletProviderId: string;
    walletProviderName: string;
    messageMappings: messageMapp[]
  }
  
  export async function mobileMoneySend(data: MobileMoneyInfo): Promise<any> {
      try {
        const response = await requestAPI.post<any>(`/api/as/mobile-money`, data);
        // toast.success(" Succesfuly Send Mobile Money");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
          // toast.error(errorMessage);
          throw new Error("Failed to fetch data info to server error");
          
        } else {
          throw new Error("Failed to fetch data info");
        }
      }
  }

  export async function deleteMobileMoneySubmit(id: number): Promise<any> {
    try {
      const response = await requestAPI.delete(`/api/cs/mobile-money/${id}`);
      // toast.success(" Succesfuly Delete Mobile Money");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
        // toast.error(errorMessage);
        throw new Error("Failed to fetch data info to server error");
      } else {
        throw new Error("Failed to fetch data info");
      }
    }
  }