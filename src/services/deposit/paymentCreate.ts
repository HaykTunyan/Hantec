import { requestAPI } from "../globalAxios";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface PaymentSend {
  paymentGatewayName?: string;
  platform?: string;
  cltCode?: string;
  name?: string;
  idType?: string;
  id?: string;
  email?: string;
  mobile?: string;
  inAmt?: string;
  ccy?: string;
  basePath?: string;
  remarks?: string;
  providerId?: string;
  method?: string;
  clientSidePaymentSuccessUrl?: string;
  clientSidePaymentSuccessUrlMethod?: string;
  clientSidePaymentFailUrl?: string;
  clientSidePaymentFailUrlMethod?: string;
  clientSidePaymentCompleteUrl?: string;
  clientSidePaymentCompleteUrlMethod?: string;
  platformId?: string;
  companyId?: string;
  paymentGatewayId?: number;
  cltCodeListStr?: string;
  bankAccountNo?: string;
  region?: string;
  countryCode?: string;
  chiName?: string;
}

export const PaymentCreateSend = async (body: any): Promise<any> => {
  try {

    const headers = {
      'Content-Type': 'application/json', 
    };

    const response = await requestAPI.post(
      `/api/ps/payment-gateway/v2/payment-create`,
      body,
      { headers }
    );

    toast.success("Payment created successfully!");
    return response.data;
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorMessage =  "Server error occurred. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      toast.error("An unexpected error occurred during payment processing.");
      throw new Error("Unexpected error occurred.");
    }
  } finally {
    toast.info("Finalizing the payment process...");
  }
};
