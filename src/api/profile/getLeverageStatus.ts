import {requestAPI} from "@/services/globalAxios";

export const getLeverageStatus = async () => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `/api/as/leverage/account/status`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return data;
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
