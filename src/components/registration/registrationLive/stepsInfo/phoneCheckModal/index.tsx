import React, {useEffect, useState} from "react";
import Button from "@/components/button";
// import {jwtDecode, JwtPayload} from "jwt-decode";
import {searchPhoneExists} from "@/api/registration/searchPhoneExists";
import {updateMobileNumber} from "@/api/registration/updateMobileNumber";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {isValidPhoneNumber, parsePhoneNumber} from "react-phone-number-input/min";
import {useTranslation} from "next-i18next";

// interface CustomJwtPayload extends JwtPayload {
//     id: string;
//     loginId: string;
// }

interface IEditModal {
    setIsEditModalOpened: (x: boolean) => void;
    setSelectedTab: (x: string) => void;
    accOpenId: number | undefined;
}

const EmailCheckModal = ({
                             setIsEditModalOpened,
                             setSelectedTab,
                             accOpenId,
                         }: IEditModal) => {
    const [phone, setPhone] = useState<string>("");
    // const [checkPin, setCheckPin] = useState<boolean>(false);
    // const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    // const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    // const [otp, setOTP] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    const [mobileError, setMobileError] = useState<boolean>(false);
    // const [otpError, setOTPError] = useState<string>("");
    const [phoneExistsErr, setPhoneExistsErr] = useState<string>("");
    const {t} = useTranslation("onboarding");
    const phoneRequest: any = t("main_event.account_verification_steps.phone_request_form", {returnObjects: true});

    const [updateRequest, setUpdateRequest] = useState<any>({
        personalInfo: {},
        bankInfo: {},
        investmentInfo: {},
        referralInfo: {},
        selfCertifications: [],
        tradingAccounts: [],
    });

    const disabledPhone = !phone || mobileError || isProcessing;

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const storedToken = localStorage.getItem("accessToken") as string;
    //         const decoded = jwtDecode<CustomJwtPayload>(storedToken);
    //         const currentEmail = decoded.loginId;
    //         setEmail(currentEmail);
    //
    //         setUpdateRequest((prevState: any) => ({
    //             ...prevState,
    //             personalInfo: {
    //                 ...prevState.personalInfo,
    //                 email: currentEmail,
    //             },
    //         }));
    //     }
    // }, []);

    // useEffect(() => {
    //     setOTP(code.join(""));
    // }, [code]);

    const handlePhoneChange = (value: string) => {
        setPhone(value);
        const valueToCheck = `+${value}`;
        if (value) {
            const phoneNumber = parsePhoneNumber(valueToCheck);
            if (phoneNumber && isValidPhoneNumber(valueToCheck)) {
                setMobileError(false);

                setUpdateRequest((prevState: any) => ({
                    ...prevState,
                    personalInfo: {
                        ...prevState.personalInfo,
                        countryMobileNo: phoneNumber.countryCallingCode,
                        mobileNo: phoneNumber.nationalNumber,
                    },
                }));
            } else {
                setMobileError(true);
            }
        }
    };

    // const handleInputChange = (index: number, value: string) => {
    //     if (/^\d$/.test(value)) {
    //         const newCode = [...code];
    //         newCode[index] = value;
    //         setCode(newCode);
    //         if (index < code.length - 1) {
    //             inputRefs.current[index + 1].focus();
    //         }
    //     } else if (value === "") {
    //         const newCode = [...code];
    //         newCode[index] = "";
    //         setCode(newCode);
    //     }
    // };

    // const disabled = code.some(digit => digit === "") || isProcessing;

    // const handleRequestOTP = () => {
    //     setIsProcessing(true);
    //     const requestBody = {
    //         "action": "VERIFY",
    //         "companyId": 20,
    //         "applicationId": 9,
    //         "receiver": email,
    //         "receiverType": 1
    //     };
    //
    //     getOTP(requestBody)
    //         .then(res => {
    //             if (res) {
    //                 setIsProcessing(false);
    //             }
    //         });
    // };

    // useEffect(() => {
    //     if (!email) return;
    //
    //     handleRequestOTP();
    // }, [email]);

    // const handleVerifyOTP = () => {
    //     setIsProcessing(true);
    //     const verifyBody = {
    //         "action": "VERIFY",
    //         "companyId": 20,
    //         "applicationId": 9,
    //         "receiver": email,
    //         otp
    //     };
    //
    //     verifyOTP(verifyBody)
    //         .then(res => {
    //             if (res && res.data.status === "success") {
    //                 setOTPError("");
    //                 setIsProcessing(false);
    //                 setCheckPin(true);
    //                 updatePersonalInfo(updateRequest, accOpenId);
    //             } else {
    //                 setIsProcessing(false);
    //                 setOTPError("The code you entered is incorrect. Please try again.");
    //             }
    //         });
    // };

    // const handleResendCode = () => {
    //     handleRequestOTP();
    // };

    const handleAddPhone = () => {
        setPhoneExistsErr("");
        setIsProcessing(true);
        searchPhoneExists({
            countryMobileNo: updateRequest.personalInfo.countryMobileNo,
            mobileNo: updateRequest.personalInfo.mobileNo
        }, 20)
            .then(res => {
                if (res && res.data.length > 0 && res.data.includes("mobileNo")) {
                    setPhoneExistsErr(phoneRequest.phone_exists_error);
                    setIsProcessing(false);
                } else {
                    updateMobileNumber(updateRequest, accOpenId!)
                        .then(resp => {
                            if (resp) {
                                setSelectedTab("instructions");
                            }
                        });
                }
                document.querySelector("body")?.classList.remove("bodyOverflowHidden");
                setIsProcessing(false);
            });
    };

    // const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Backspace" && code[index] === "") {
    //         if (index > 0) {
    //             inputRefs.current[index - 1].focus();
    //         }
    //     }
    // };
    //
    // const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    //     const pastedData = e.clipboardData.getData("text");
    //     if (/^\d{6}$/.test(pastedData)) {
    //         const newCode = pastedData.split("");
    //         setCode(newCode);
    //         newCode.forEach((digit, index) => {
    //             inputRefs.current[index].value = digit;
    //         });
    //         inputRefs.current[5].focus();
    //     }
    //     e.preventDefault();
    // };

    const handleCloseModal = () => {
        setIsEditModalOpened(false);
        document.querySelector("body")?.classList.remove("bodyOverflowHidden");
    };

    // useEffect(() => {
    //     if(otp.length === 6) {
    //         handleVerifyOTP();
    //     }
    // }, [otp]);

    useEffect(() => {
        return () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        };
    }, []);

    return (
        <div
            className="absolute tablet:fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
            <div
                className="max-w-[676px] w-full pt-18 pb-16 px-[150px] mobile:px-4 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10 relative">
                <div className="flex flex-col gap-4 items-center">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12.5 1.25C6.56294 1.25 1.75 6.06294 1.75 12C1.75 17.9371 6.56294 22.75 12.5 22.75C18.4371 22.75 23.25 17.9371 23.25 12C23.25 6.06294 18.4371 1.25 12.5 1.25ZM12.5 8.75C12.9142 8.75 13.25 8.41421 13.25 8C13.25 7.58579 12.9142 7.25 12.5 7.25C12.0858 7.25 11.75 7.58579 11.75 8C11.75 8.41421 12.0858 8.75 12.5 8.75ZM13.25 11C13.25 10.5858 12.9142 10.25 12.5 10.25H11V11.75H11.75V15.25H11C10.5858 15.25 10.25 15.5858 10.25 16C10.25 16.4142 10.5858 16.75 11 16.75H14V15.25H13.25V11Z"
                              fill="#2B2A28"/>
                    </svg>
                    <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                        <span
                            className="text-20-18 font-medium">
                            {/*{*/}
                            {/*!checkPin ? "Check your inbox" */}
                            {/*: */}
                            {/*"*/}
                            {phoneRequest.title}
                            {/*"*/}
                            {/*}*/}
                        </span>
                        <span className="text-14_16 text-grey-seccondary tracking-wider">
                            {/*{*/}
                            {/*    !checkPin*/}
                            {/*        ? "We have sent you a secure code. Please  check your e-mail to authenticate your account"*/}
                            {/*        : "*/}
                            {phoneRequest.description}
                            {/*"}*/}
                        </span>
                    </div>
                </div>
                {/*{*/}
                {/*    !checkPin*/}
                {/*        ? <>*/}
                {/*            <div className={`*/}
                {/*                flex items-center justify-center gap-2 mobile:gap-0 py-10 px-8 bg-white border */}
                {/*                 ${!disabled ? "border-default" : "border-grey-extra-light"} rounded-[4px]*/}
                {/*                `}>*/}
                {/*                {code.map((digit, index) => (*/}
                {/*                    <div key={index} className="inputCodeContainer">*/}
                {/*                        <input*/}
                {/*                            type="text"*/}
                {/*                            maxLength={1}*/}
                {/*                            value={digit}*/}
                {/*                            onChange={(e) => handleInputChange(index, e.target.value)}*/}
                {/*                            onKeyDown={(e) => handleKeyDown(index, e)}*/}
                {/*                            onPaste={handlePaste}*/}
                {/*                            //@ts-ignore*/}
                {/*                            ref={(el) => inputRefs.current[index] = el!}*/}
                {/*                            className={`inputCode`}*/}
                {/*                            placeholder={"0"}*/}
                {/*                        />*/}
                {/*                        <div className="inputCodeRightBorder"></div>*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                {/*            </div>*/}
                {/*            {*/}
                {/*                otpError && <span className={"text-error text-11 absolute bottom-[145px]"}>{otpError}</span>*/}
                {/*            }*/}
                {/*            <div className="flex flex-col items-center justify-center gap-2">*/}
                {/*                <button*/}
                {/*                    className={`btnPrim btnLoading`}*/}
                {/*                    disabled={disabled}*/}
                {/*                    onClick={handleVerifyOTP}*/}
                {/*                >*/}
                {/*                    Continue*/}
                {/*                    {isProcessing && (*/}
                {/*                        <img*/}
                {/*                            src="/icons/new/loading.svg"*/}
                {/*                            alt="processing"*/}
                {/*                            className="w-4 h-4 object-contain"*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*                </button>*/}
                {/*                <span*/}
                {/*                    className="text-14 text-grey-seccondary cursor-pointer"*/}
                {/*                    onClick={handleResendCode}*/}
                {/*                >Re-send code</span>*/}
                {/*            </div>*/}
                {/*        </>*/}
                {/*        : */}
                <>
                    <div className="flex flex-col gap-1.5 mb-5 relative">
                        <label htmlFor="phone" className="text-14 tracking-wider text-default">Mobile</label>
                        <div className={"flex w-full h-full"}>
                            <PhoneInput
                                placeholder={phoneRequest.phone_placeholder}
                                containerClass={"inputPhoneContainer"}
                                inputClass={"inputPhone"}
                                buttonClass={"phoneDrpDwn"}
                                country={""}
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        {
                            phoneExistsErr && <span className={"text-error text-11"}>{phoneExistsErr}</span>
                        }
                    </div>
                    <div className="flex gap-2 justify-center">
                        <Button
                            btnName={phoneRequest.buttons.cancel}
                            className={"btnSec"}
                            request={handleCloseModal}
                        />
                        <Button
                            disabled={disabledPhone}
                            btnName={phoneRequest.buttons.continue}
                            className={"btnPrim"}
                            request={handleAddPhone}
                        />
                    </div>
                </>
                {/*}*/}
            </div>
        </div>
    );
};

export default EmailCheckModal;
