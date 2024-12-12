import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "next-i18next";

interface ICodeConfirm {
    handleRequestOTP: () => void;
    handleVerifyOTP: () => void;
    setOTP: (value: string) => void;
    isProcessing: boolean;
    otpError: string;
}

const CodeConfirm = ({
                         handleVerifyOTP,
                         handleRequestOTP,
                         isProcessing,
                         setOTP,
                         otpError
                     }: ICodeConfirm) => {
    const {t} = useTranslation("registration");
    const title = t("pin_check_form.check_your_inbox");
    const description = t("pin_check_form.description");
    const continueBtn = t("pin_check_form.buttons.continue");
    const reSendBtn = t("pin_check_form.buttons.re_send");

    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        setOTP(code.join(""));
    }, [code]);

    const handleInputChange = (index: number, value: string) => {
        if (/^\d$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (index < code.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === "") {
            const newCode = [...code];
            newCode[index] = "";
            setCode(newCode);
        }
    };

    const disabled = code.some(digit => digit === "") || isProcessing;

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && code[index] === "") {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData("text");
        if (/^\d{6}$/.test(pastedData)) {
            const newCode = pastedData.split("");
            setCode(newCode);
            newCode.forEach((digit, index) => {
                inputRefs.current[index].value = digit;
            });
            inputRefs.current[5].focus();
        }
        e.preventDefault();
    };

    return (
        <div className="max-w-[400px] tablet:px-6 w-full mx-auto flex flex-col gap-10 tablet:gap-14 relative">
            <div className="flex flex-col gap-2.5 text-center tablet:px-6">
                <span className="text-48-32 font-medium text-default">{title}</span>
                <span className="text-18-16-l2 text-grey-seccondary">
                    {description}
                </span>
            </div>
            <div className={`
            flex items-center justify-center gap-2 mobile:gap-0 py-10 px-8 bg-white border 
             ${!disabled ? "border-default" : "border-grey-extra-light"} rounded-[4px]
            `}>
                {code.map((digit, index) => (
                    <div key={index} className="inputCodeContainer">
                        <input
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            //@ts-ignore
                            ref={(el) => inputRefs.current[index] = el!}
                            className={`inputCode`}
                            placeholder={"0"}
                            inputMode="numeric"
                            pattern="\d*"
                        />
                        <div className="inputCodeRightBorder"></div>
                    </div>
                ))}
            </div>
            {
                otpError && <span className={"text-error absolute bottom-[90px] text-11"}>{otpError}</span>
            }
            <div className="flex flex-col items-center justify-center gap-2">
                <button
                    className={`btnPrim btnLoading`}
                    disabled={disabled}
                    onClick={handleVerifyOTP}
                >
                    {continueBtn}
                    {isProcessing && (
                        <img
                            src="/icons/new/loading.svg"
                            alt="processing"
                            className="w-4 h-4 object-contain"
                        />
                    )}
                </button>
                <span
                    className="text-14 text-grey-seccondary cursor-pointer"
                    onClick={handleRequestOTP}
                >{reSendBtn}</span>
            </div>
        </div>
    );
};

export default CodeConfirm;
