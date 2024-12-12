// https://rinex-portal-uat.hantecgroup.com/api/as/crypto-wallet

import { requestAPI } from "../globalAxios";
import axios from "axios";
// import { toast } from 'react-toastify';

interface messageMapp {
    statusId: number,
    messageId: string,
}

interface CryptoInfo {
    appDate: number;
    autoApprove: boolean;
    clientUserId: number;
    companyId: string;
    walletAddress: string;
    walletName: string;
    walletType: string;
    messageMappings: messageMapp[]
  }
  
  export async function cryptoInfoSend(data: CryptoInfo): Promise<any> {
      try {
        const response = await requestAPI.post<any>(`/api/as/crypto-wallet`, data);
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


  export async function deleteCryptoSubmit(id: number): Promise<any> {
    try {
      const response = await requestAPI.delete(`/api/cs/crypto-wallet/${id}`);
      // toast.success(" Succesfuly Delete Crypto Wallet");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
          // toast.error(errorMessage);
        throw new Error("Failed to fetch data info to server error");
      } else {
        throw new Error("Failed to fetch data info");
      }
    }
  }