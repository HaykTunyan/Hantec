import {requestAPI} from "@/services/globalAxios";

export const getData = async () => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `api/ss/application/data/all`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            data
        };
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
            return null;
        }
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
