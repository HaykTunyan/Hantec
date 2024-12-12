// https://rinex-portal-uat.hantecgroup.com/api/cs/client/49802

// https://rinex-portal-uat.hantecgroup.com/api/cs/client/53748

import { requestAPI } from "../globalAxios";
import axios from 'axios';
import { toast } from 'react-toastify';

export async function getClient(id: number): Promise<any> {
  try {
    const response = await requestAPI.get(`/api/cs/client/${id}`);
    return response.data;
  } catch (error) {

    if (axios.isAxiosError(error)) {

     
      // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      // toast.error(errorMessage);
      throw new Error(`Failed to fetch client data: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
