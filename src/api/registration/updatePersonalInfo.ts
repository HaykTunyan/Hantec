import {requestAPI} from "@/services/globalAxios";

interface UpdatePersonalInfoResponse {
    msg?: string;
    data?: any;
}

export const updatePersonalInfo = async (
    personalInfo: any,
    accOpenId: number | undefined,
    tinData?: any
): Promise<any> => {

    try {
        const response = await requestAPI.patch<UpdatePersonalInfoResponse>(
            `/api/as/acc-open/${accOpenId}`,
            {
                personalInfo,
                selfCertifications: tinData,
                tradingAccounts: [],
                id: accOpenId,
                bankInfo: {},
                investmentInfo: {},
                referralInfo: {}
            }
        );

        return response.data;
    } catch (error) {
        if (error) {
            return error;
        }
    }
};
