import {requestAPI} from "@/services/globalAxios";

export const getDailyReviewToken = async () => {

    try {
        const response = await requestAPI.get(
            `/api/acs/user/token/trading-central`,
        );

        const data = response.data;

        return {
            data
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
