import React, {useEffect, useState} from "react";
import LoadingScreen from "@/components/loadingScreen";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/navigation";

interface IDemoTurnModal {
    onClose: (x: boolean) => void;
    id: string;
    email: string;
}

const RejectedModal = ({onClose, id, email}: IDemoTurnModal) => {
        const router = useRouter();
        const {t} = useTranslation("rejected_modal");

        const [isProcessing, setIsProcessing] = useState(false);
        const [accessToken, setAccessToken] = useState<string | null>(null);

        const handleNewAccount = async () => {
            const statusError = 200;
            const backendUrl =
                "https://rinex-portal-uat.hantecgroup.com/api/as/acc-open";

            try {
                const response = await fetch(backendUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "accept-language": "en-US",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        companyId: 20,
                        appId: 9,
                        region: "AFRICA",
                        clientUserId: id,
                        aeCode: 4010,
                        appDate: new Date(),
                        messageMappings: [
                            {
                                statusId: 2,
                                messageId: 11000,
                            },
                            {
                                statusId: 3,
                                messageId: 32,
                            },
                            {
                                statusId: 2,
                                toIb: true,
                                messageId: 31,
                            },
                        ],
                        personalInfo: {
                            email
                        },
                        referralInfo: {},
                        selfCertifications: [],
                        tradingAccounts: [],
                        investmentInfo: {},
                        bankInfo: {},
                        autoApprove: true,
                        accCommission: null,
                        accGroup: null,
                    }),
                });

                if (response.status !== statusError) {
                    throw new Error("Server responded with a non-2xx status code.");
                }

                const data = await response.json();
                return {
                    data,
                };
            } catch (error) {
                new Error(`Server responded with a non-2xx status code: ${error}`);
                return null;
            }
        };

        useEffect(() => {
            if (typeof window !== "undefined") {
                setAccessToken(localStorage.getItem("accessToken"));
            }
        }, []);

        const handleCloseModal = () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
            onClose(false);
        };

        const handleNewApplication = () => {
            setIsProcessing(true);

            handleNewAccount()
                .then(res => {
                    setIsProcessing(false);
                    onClose(false);
                    router.push("/registration/register-live-account");
                })
                .catch(err => {
                    setIsProcessing(false);
                    onClose(false);
                    window.location.reload();
                });
        };

        return (
            <div
                className={`fixed inset-0 z-[5000] flex items-center justify-center bg-gray-800 bg-opacity-50`}
            >
                <LoadingScreen isLoading={isProcessing}/>
                <div
                    className="relative w-[342px] md:w-full md:max-w-[676px] max-h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="relative bg-white rounded-lg px-[94px] tablet:px-6 pt-[72px] pb-[64px]  flex flex-col gap-8">
                        <div className="flex flex-col gap-4 items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8C11.25 8.41421 11.5858 8.75 12 8.75ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H10.5V11.75H11.25V15.25H10.5C10.0858 15.25 9.75 15.5858 9.75 16C9.75 16.4142 10.0858 16.75 10.5 16.75H13.5V15.25H12.75V11Z"
                                      fill="#2B2A28"/>
                            </svg>
                            <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                <span className="text-20-18 font-medium">
                                    {t("title")}
                                </span>
                                <span
                                    className={"text-14_16 text-grey-seccondary tracking-[0.28px]"}
                                >
                                    {t("description")}
                                </span>
                            </div>
                        </div>
                        <div className={"flex gap-2 items-center self-center"}>
                            <button
                                type="button"
                                className={"btnSec"}
                                onClick={handleCloseModal}
                            >
                                {t("buttons.cancel")}
                            </button>
                            <button
                                type="button"
                                className={"btnPrim"}
                                onClick={handleNewApplication}
                            >
                                {t("buttons.Continue")}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default RejectedModal;
