import { requestAPI } from "@/services/globalAxios";

// Define the return type for better type safety
interface AssetsInfo {
    userName: string;
    email: string;
    phone: string;
}

/**
 * Fetches the user's asset information based on provided parameters.
 *
 * @param platformIdListInStr - Comma-separated list of platform IDs.
 * @param accountCodeListInStr - Comma-separated list of account codes.
 * @param otherStartIdx - The start index for the other parameters.
 * @returns {Promise<AssetsInfo | null>} - The user's asset information or null if an error occurs.
 */
export const getMyAssetsInfo = async (
    platformIdListInStr: string,
    accountCodeListInStr: string,
    otherStartIdx: number
): Promise<AssetsInfo | null> => {
    try {
        // Perform the API request with the provided parameters
        const response = await requestAPI.get(`/api/cs/report/trade-distribution`, {
            params: {
                platformIdListInStr,
                accountCodeListInStr,
                otherStartIdx,
            },
        });

        // Check for non-2xx status codes
        // @ts-ignore
        if (response.status !== "200") {
            throw new Error(`Server responded with a non-2xx status code: ${response.status}`);
        }

        const data = response;

        // Construct the return object
        return {
            userName: data.data.nameEng,
            email: data.data.email,
               // @ts-ignore
            phone: `${data.mobileNoArea} ${data.mobileNo}`,
        };
    } catch (error) {
        return null;
    }
};
