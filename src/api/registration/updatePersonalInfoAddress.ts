import {requestAPI} from "@/services/globalAxios";

export const updatePersonalInfoAddress = async (personalInfo: any, accOpenId: number | undefined) => {
    const statusError = 200;
    try {
        const response = await requestAPI.patch(
            `/api/as/acc-open/${accOpenId}`,
            personalInfo
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
