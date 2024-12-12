import {requestAPI} from "@/services/globalAxios";

export const submitAccount = async (accOpenId: any) => {
    const statusError = 200;
    try {
        const response = await requestAPI.post(
            `/api/as/acc-open/submit`,
            {id: accOpenId}
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
