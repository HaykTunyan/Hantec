import {requestAPI} from "@/services/globalAxios";

export const getUserInfo = async (id: number) => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `/api/cs/client/${id}`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            userName: data.data.nameEng || "",
            email: data.data.email || "",
            phone: (data.data.mobileNoArea || "") + " " + (data.data.mobileNo || ""),
            addrMail1: data.data.addrMail1 || "",
            addrMail2: data.data.addrMail2 || "",
            addrMail3: data.data.addrMail3 || "",
            addrMailPostalCode: data.data.addrMailPostalCode || "",
            addrResidential1: data.data.addrResidential1 || "",
            addrResidential2: data.data.addrResidential2 || "",
            addrResidential3: data.data.addrResidential3 || "",
            addrResidentialPostalCode: data.data.addrResidentialPostalCode || "",
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
