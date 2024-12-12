import {requestAPI} from "@/services/globalAxios";

export const forgotTradingPassword = async (receiver: string, templateId: number, tradingAccountId: number, url: string) => {
    const statusError = 200;
    try {
        const response = await requestAPI.post(
            `/api/cs/trading-account/forgot-password`,
            {
                receiver,
                templateId,
                tradingAccountId,
                url
            }
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            data
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
