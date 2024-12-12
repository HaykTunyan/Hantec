import {requestAPI} from "@/services/globalAxios";

export const uploadFile = async (file: File | null, type: string, accOpenId: string) => {
    const statusError = 200;
    try {

        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("fileType", type);
        formData.append("appRef", accOpenId);

        const response = await requestAPI.post(
            `/api/as/acc-open/file`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
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
