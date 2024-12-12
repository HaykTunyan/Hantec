// https://rinex-portal-uat.hantecgroup.com/api/fcs/v2/payment-gateway/options/MOBILE_MONEY/RW

import { requestAPI } from "../globalAxios";
import axios from 'axios';
import { toast } from 'react-toastify';

export async function getOptionCountryCode(countryCode: string) : Promise<any> {
    try {
        const response = await requestAPI.get(`/api/fcs/v2/payment-gateway/options/MOBILE_MONEY/${countryCode}`);

        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.msg || "Please try again";
            toast.error(errorMessage);
            throw new Error(`Failed to fetch client data: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}