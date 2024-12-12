import {requestAPI} from "@/services/globalAxios";

export const resetAccountPassword = async (token: string, newPassword: string, newPasswordConfirm: string) => {
    const statusError = 200;
    try {
        const response = await requestAPI.post(
            `/api/acs/reset-password`,
            {
                password: newPassword,
                confirmPassword: newPasswordConfirm
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
