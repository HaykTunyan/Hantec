import axios, { AxiosResponse } from "axios";

export const sendVerificationEmail = async (email: string): Promise<{ response?: AxiosResponse, error?: any }> => {
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await axios.post(`${backendUrl}/api/acs/forget`,
            {
                applicationId: "9",
                companyId: "20",
                loginId: email,
                templateId: "24",
                url: `${baseUrl}/reset`
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        return { response };
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            // Axios error with a response (HTTP status outside the 2xx range)
            return { error: error.response };
        } else {
            // Generic error (e.g., network issues)
            return { error: new Error(`Error sending verification email: ${error.message || error}`) };
        }
    }
};
