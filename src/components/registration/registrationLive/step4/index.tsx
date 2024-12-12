import React, {useState} from "react";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
}

const OnboardingStep4 = ({setSelectedTab, lineWidth}: IStepsInfo) => {
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    // const [updateRequest, setUpdateRequest] = useState<any>({
    //     personalInfo: {},
    //     bankInfo: {},
    //     investmentInfo: {},
    //     referralInfo: {},
    //     selfCertifications: [],
    //     tradingAccounts: [],
    // });

    const disabled = !selectedMethod;

    // useEffect(() => {
    //     const currentUpdateRequest = localStorage.getItem("updateRequest");
    //     setUpdateRequest(currentUpdateRequest);
    // }, []);

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <button className="btnThird">
                    Save and exit
                </button>
            </div>
            <div className="max-w-[356px] w-full mx-auto flex flex-col gap-6 tablet:mb-10">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        Trading Platform
                    </button>
                    <span className="text-32 font-medium">
                        Select which platform you want to trade on
                    </span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-20-20 text-default font-medium">
                        Choose which platform you want to trade with
                    </span>
                    <span className="text-14_16 text-grey-seccondary tracking-wider">
                        Trade with leverage and tight spreads for better returns on successful trades. Learn More
                    </span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <div
                                onClick={() => setSelectedMethod("mt5")}
                                className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "mt5" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                <span
                                    className={`text-14 tracking-wider font-medium ${selectedMethod === "mt5" ? "text-white" : ""}`}>MT5</span>
                                {
                                    selectedMethod === "mt5" ?
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                  fill="white"/>
                                        </svg>
                                        : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                               xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                        </svg>
                                }
                            </div>
                            <div
                                onClick={() => setSelectedMethod("mt4")}
                                className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "mt4" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 tracking-wider font-medium ${selectedMethod === "mt4" ? "text-white" : ""}`}>MT4</span>
                                {
                                    selectedMethod === "mt4" ?
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                  fill="white"/>
                                        </svg>
                                        : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                               xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                        </svg>
                                }
                            </div>
                            <div
                                onClick={() => setSelectedMethod("both")}
                                className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "both" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                <span
                                    className={`text-14 tracking-wider font-medium ${selectedMethod === "both" ? "text-white" : ""}`}>Both (MT5+MT4)</span>
                                {
                                    selectedMethod === "both" ?
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9 12.375C10.864 12.375 12.375 10.864 12.375 9C12.375 7.13604 10.864 5.625 9 5.625C7.13604 5.625 5.625 7.13604 5.625 9C5.625 10.864 7.13604 12.375 9 12.375Z"
                                                  fill="white"/>
                                        </svg>
                                        : <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                               xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9.5" cy="9" r="8.55" stroke="#E8E5E1" strokeWidth="0.9"/>
                                        </svg>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div className="py-2 px-4 flex items-center justify-end border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    <button
                        className="btnPrim"
                        disabled={disabled}
                        onClick={() => setSelectedTab("finish")}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingStep4;
