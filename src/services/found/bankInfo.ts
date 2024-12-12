// https://rinex-portal-uat.hantecgroup.com/api/as/bank-info

import { requestAPI } from "../globalAxios";
import axios from "axios";
// import { toast } from 'react-toastify';

interface messageMapp {
    statusId: number,
    messageId: string,
}

interface BankInfo {
  bankAccNo: string;
  autoApprove: boolean;
  appDate: number | null;
  bankAddr: string;
  bankCode: string;
  iban: string;
  clientUserId: number;
  companyId: string;
  swiftCode: string;
  messageMappings: messageMapp[]
}

export async function bankInfoSend(data: BankInfo): Promise<any> {
    try {
      const response = await requestAPI.post<any>(`/api/as/bank-info`, data);
      // toast.success(" Succesfuly Send Information");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
        //   toast.error(errorMessage);
        throw new Error("Failed to fetch bank info due to server error");
      } else {
        throw new Error("Failed to fetch bank info");
      }
    }
}


export async function bankInfoSubmit(id: string) : Promise<any> {
    try {
        const response = await requestAPI.post<any>(`api/as/bank-info/submit`, id);
        // toast.success(" Succesfuly Send Information");
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



export async function deleteBankSubmit(id: number): Promise<any> {
    try {
      const response = await requestAPI.delete(`/api/cs/client/bank/${id}`);
      // toast.success(" Succesfuly Delete Bank");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error("Failed to fetch data info to server error");
      } else {
        throw new Error("Failed to fetch data info");
      }
    }
  }