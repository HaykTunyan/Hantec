import {requestAPI} from "@/services/globalAxios";

export const updateUserInfo = async (body: any, id: number) => {

    try {
        const response = await requestAPI.patch(
            `/api/cs/client/${id}`,
            body
        );

        const data = response;

        return {
           data
        };
    } catch (error) {
        return error;
    }
};
