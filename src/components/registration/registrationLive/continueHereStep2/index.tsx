import React, {useState} from "react";
import Input from "@/components/input";
import MobileBottomLine from "@/components/registration/registrationLive/mobileBottomLine";

interface IStepsInfo {
    setSelectedTab: (x: string) => void;
    lineWidth: number;
}

const ContinueHereStep2 = ({setSelectedTab, lineWidth}: IStepsInfo) => {
    const [country, setCountry] = useState<string>("");
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    const disabled = !selectedMethod;

    return (
        <div
            className="w-full h-full bg-grey-exrta-ligth-extra flex flex-col justify-between gap-10 tablet:gap-2 relative">
            <div className="w-full py-2 px-4 flex items-center justify-end">
                <button className="btnThird">
                    Save and exit
                </button>
            </div>
            <div className="max-w-[362px] w-full mx-auto flex flex-col gap-6 tablet:mb-10">
                <div className="hidden tablet:flex flex-col items-start gap-3.5 mb-6">
                    <button className="btnSec btnLogin">
                        Account Verification
                    </button>
                    <span className="text-32 font-medium">
                        Upload a proof of residential address
                    </span>
                </div>
                <span className="text-20-20 text-default font-medium">
                    Choose an address document type to add
                </span>
                <div className="w-full p-6 tablet:px-4 flex items-center gap-3 bg-orange-extra-light rounded-[8px]">
                    <span className="text-12_14 text-grey-tertiary">
                        Can&apos;t upload your ID for automatic verification? Use
                        <span className="font-medium"> &apos;Manual Verification&apos;</span>
                    </span>
                    <button
                        className={"btnPrim"}
                        style={{flex: "0 0 auto"}}
                        onClick={() => setSelectedTab("manual_address")}
                    >
                        Manual Verification
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="w-full flex items-center justify-end gap-4 py-4">
                        <span className="text-12 text-default">Get Help</span>
                        <button
                            className="btnSec btnLanguage"
                        >
                            <span>EN</span>
                            <svg
                                className={`w-4 h-4 object-contain`}
                                width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                                      fill="#2B2A28"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="country">Issuing country/region</label>
                            <Input
                                htmlFor={"country"}
                                currentValue={country}
                                handleValueChange={(e) => setCountry(e.target.value)}
                                type={"text"}
                                placeholder="&nbsp;"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span>Select document type for verification</span>
                            <div className="flex flex-col gap-2">
                                <div
                                    onClick={() => setSelectedMethod("national_id")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "national_id" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 tracking-wider font-medium ${selectedMethod === "national_id" ? "text-white" : ""}`}>National ID</span>
                                    {
                                        selectedMethod === "national_id" ?
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
                                    onClick={() => setSelectedMethod("bank_statement")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "bank_statement" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 tracking-wider font-medium ${selectedMethod === "bank_statement" ? "text-white" : ""}`}>Bank Statement</span>
                                    {
                                        selectedMethod === "bank_statement" ?
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
                                    onClick={() => setSelectedMethod("utility_bill")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "utility_bill" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 tracking-wider font-medium ${selectedMethod === "utility_bill" ? "text-white" : ""}`}>Utility bill</span>
                                    {
                                        selectedMethod === "utility_bill" ?
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
                                    onClick={() => setSelectedMethod("driver_license")}
                                    className={`
                                    flex items-center w-full justify-between rounded border border-grey-extra-light p-6 cursor-pointer
                                    ${selectedMethod === "driver_license" ? "bg-default" : ""}
                                    transition duration-500
                                    `}>
                                    <span
                                        className={`text-14 tracking-wider font-medium ${selectedMethod === "driver_license" ? "text-white" : ""}`}>Driver’s license</span>
                                    {
                                        selectedMethod === "driver_license" ?
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
                                <span
                                    className="text-14_16 text-grey-seccondary underline custom-underline self-end mt-2">
                                    Don’t have the required documents?
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-[61px]">
                <MobileBottomLine lineWidth={lineWidth}/>
                <div className="py-2 px-4 flex items-center justify-between border-t border-grey-extra-light fixed bottom-0 w-[58%] tablet:w-full bg-grey-exrta-ligth-extra">
                    <button
                        onClick={() => setSelectedTab("choose-platform")}
                        className="btnSec"
                    >
                        Back
                    </button>
                    <button
                        className="btnPrim"
                        disabled={disabled}
                        onClick={() => setSelectedTab("steps3")}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContinueHereStep2;
