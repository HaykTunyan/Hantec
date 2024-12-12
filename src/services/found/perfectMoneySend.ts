// https://rinex-portal-uat.hantecgroup.com/api/as/perfect-money

import { requestAPI } from "../globalAxios";
import axios from "axios";
// import { toast } from 'react-toastify';

interface messageMapp {
  statusId: number;
  messageId: string;
}

interface PerfectMoneyInfo {
  appDate: number;
  clientUserId: number;
  companyId: string;
  accHolderName: string;
  accNo: string;
  messageMappings: messageMapp[];
}

export async function perfectMoneySend(data: PerfectMoneyInfo): Promise<any> {
  try {
    const response = await requestAPI.post<any>(`/api/as/perfect-money`, data);
    // toast.success(" Succesfuly Send Perfect Money");
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

export async function deletePerfectMoney(id: number): Promise<any> {
  try {
    const response = await requestAPI.delete(`/api/as/perfect-money/${id}`);
    // toast.success("Successfully deleted Perfect Money record.");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      // toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      throw new Error("Failed to communicate with the server.");
    }
  }
}

// export async function deletePerfectMoney(id: number): Promise<any> {
//   try {
//     const response = await requestAPI.delete(`/api/as/perfect-money/${id}`);
//     toast.success(" Succesfuly Delete Perfect Money");
//     return response.data;
//   } catch (error) {
  
//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
//       toast.error(errorMessage);
//       throw new Error("Failed to fetch data info to server error");
//     } else {
//       throw new Error("Failed to fetch data info");
//     }
//   }
// }
