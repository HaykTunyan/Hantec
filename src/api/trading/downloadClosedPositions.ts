import axios from "axios";

export const downloadClosedPositions = async (
    accountNumber: string,
    platformId: number,
    fromDate: string,
    toDate: string
) => {
    const statusError = 200;

    try {
        const token = localStorage.getItem("accessToken");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(
            `${apiUrl}/api/cs/report/closePositions/export?locale=en_US`,
            {
                params: {
                    platformId,
                    accountCode: accountNumber,
                    fromDate,
                    toDate,
                },
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        return response.data;
    } catch (error) {
        return null;
    }
};
