import {requestAPI} from "@/services/globalAxios";

export const updateTradingPassword = async (tradingAccountId: number, oldPw: string, newPw: string, newPwConfirm: string) => {

    try {
        const response = await requestAPI.post(
            `/api/cs/trading-account/change-password`,
            {
                tradingAccountId,
                oldPw,
                newPw,
                newPwConfirm
            }
        );

        const data = response;

        return {
            data
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
