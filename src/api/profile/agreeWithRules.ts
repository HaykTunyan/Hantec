import {requestAPI} from "@/services/globalAxios";

export const agreeWithRules = async () => {
    try {
        const response = await requestAPI.patch(
            `/api/cs/client/agreement`,
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
