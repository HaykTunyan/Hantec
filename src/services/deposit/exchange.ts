// https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/exchange-rate?app_id=oiPk4h0crhF8L8FsCaJe&base=USD

import { requestAPI } from "../globalAxios";
import axios from 'axios';
import { toast } from 'react-toastify';

interface ExchangeGetewayProps {
    app_id: string;
    base: string;
}

export async function getExchangeGeteway({ app_id , base  }: ExchangeGetewayProps): Promise<any> {
    const url = `https://rinex-portal-uat.hantecgroup.com/api/ps/payment-gateway/v1/exchange-rate?app_id=${app_id}&base=${base}`;
    
    try {
        const response = await requestAPI.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
            // toast.error(errorMessage);
            throw new Error(`Failed to fetch exchange gateway data: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}
