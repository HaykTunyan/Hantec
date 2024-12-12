import {requestAPI} from "@/services/globalAxios";

export const subAccOpen = async (requestData: any) => {
    const statusError = 200;
    try {
        const response = await requestAPI.post(
            `/api/as/sub-acc-open`,
            requestData
        );

        return {
            response
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
