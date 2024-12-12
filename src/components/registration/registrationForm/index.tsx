import React, {useEffect, useState} from "react";
import Input from "@/components/input";
import {useTranslation} from "next-i18next";

interface IRegistrationForm {
    handleRequestOTP: () => void;
    isProcessing: boolean;
    fullName: string;
    setFullName: (x: string) => void;
    email: string;
    setEmail: (x: string) => void;
    password: string;
    setPassword: (x: string) => void;
    disabled: boolean;
    isEmailValid: boolean;
    isFullNameValid: boolean;
    atLeast8Characters: boolean;
    atLeastOneNumber: boolean;
    atLeastOneLetter: boolean;
    emailExistsErr: string;
}

const RegistrationForm = ({
                              handleRequestOTP,
                              isProcessing,
                              fullName,
                              setFullName,
                              email,
                              setEmail,
                              password,
                              setPassword,
                              disabled,
                              isFullNameValid,
                              isEmailValid,
                              atLeastOneNumber,
                              atLeastOneLetter,
                              atLeast8Characters,
                              emailExistsErr
                          }: IRegistrationForm) => {
    const {t} = useTranslation("registration");

    const welcomeTitle = t("welcome_title");
    const welcomeDesc = t("welcome_desc");
    const fullNameLabel = t("form.full_name");
    const emailLabel = t("form.e-mail");
    const passwordLabel = t("form.password");
    const passwordErrorsTitle = t("form.errors.title");
    const atLeast8characters = t("form.errors.8_characters");
    const atLeast1Letter = t("form.errors.1_letter");
    const atLeast1Number = t("form.errors.1_number");
    const signUp = t("form.buttons.sign_up");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleRequestOTP();
            }
        };

        window.addEventListener("keydown", handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        };
    }, [fullName, email, password]);

    return (
        <div className="max-w-[376px] tablet:px-6 w-full mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-2.5 text-center tablet:px-6">
                <span className="text-48-32 font-medium text-default">{welcomeTitle}</span>
                <span className="text-18-16-l2 text-grey-seccondary">{welcomeDesc}</span>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="fullName"
                        className="text-14 tracking-wider text-default"
                    >{fullNameLabel}</label>
                    <Input
                        htmlFor={"fullName"}
                        currentValue={fullName}
                        handleValueChange={(e) => setFullName(e.target.value)}
                        type={"text"}
                        placeholder="&nbsp;"
                        errorMsg={isFullNameValid}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="email"
                        className="text-14 tracking-wider text-default"
                    >{emailLabel}</label>
                    <Input
                        htmlFor={"email"}
                        currentValue={email}
                        handleValueChange={(e) => setEmail(e.target.value)}
                        type={"text"}
                        placeholder="&nbsp;"
                        errorMsg={isEmailValid}
                    />
                </div>
                <div className="flex flex-col gap-1.5 relative">
                    <label
                        htmlFor="password"
                        className="text-14 tracking-wider text-default"
                    >{passwordLabel}</label>
                    <Input
                        htmlFor={"password"}
                        currentValue={password}
                        handleValueChange={(e) => setPassword(e.target.value)}
                        type={`${isPasswordVisible ? "text" : "password"}`}
                        placeholder="&nbsp;"
                    />
                    <svg
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3.5 top-9 cursor-pointer"
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.66699 9.99935C1.66699 9.99935 4.6973 4.16602 10.0003 4.16602C15.3034 4.16602 18.3337 9.99935 18.3337 9.99935C18.3337 9.99935 15.3034 15.8327 10.0003 15.8327C4.6973 15.8327 1.66699 9.99935 1.66699 9.99935Z"
                            stroke="#686765" strokeWidth="1.25" strokeLinejoin="round"/>
                        <path
                            d="M9.99967 11.6673C10.9201 11.6673 11.6663 10.9211 11.6663 10.0007C11.6663 9.08018 10.9201 8.33398 9.99967 8.33398C9.0792 8.33398 8.33301 9.08018 8.33301 10.0007C8.33301 10.9211 9.0792 11.6673 9.99967 11.6673Z"
                            stroke="#686765" strokeWidth="1.25" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex flex-col p-4 rounded-[4px] gap-1 border border-grey-extra-light">
                        <span
                            className="text-14 text-green-check tracking-wider mb-1">{passwordErrorsTitle}:</span>
                        <div className="flex items-center gap-1 h-4">
                            <span
                                className={`text-14 tracking-wider ${atLeast8Characters ? "text-green-extra-dark" : "text-error"}`}>
                                {atLeast8characters}
                            </span>
                            {
                                atLeast8Characters && <svg

                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                                          fill="#2B2A28"/>
                                </svg>
                            }
                        </div>
                        <div className="flex items-center gap-1 h-4">
                            <span
                                className={`text-14 tracking-wider ${atLeastOneLetter ? "text-green-extra-dark" : "text-error"}`}>
                                {atLeast1Letter}
                            </span>
                            {
                                atLeastOneLetter && <svg

                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                                          fill="#2B2A28"/>
                                </svg>
                            }
                        </div>
                        <div className="flex items-center gap-1 h-4">
                            <span
                                className={`text-14 tracking-wider ${atLeastOneNumber ? "text-green-extra-dark" : "text-error"}`}>
                                {atLeast1Number}
                            </span>
                            {
                                atLeastOneNumber && <svg

                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                                          fill="#2B2A28"/>
                                </svg>
                            }
                        </div>
                    </div>
                    {
                        emailExistsErr && <span className={"text-error text-11"}>{emailExistsErr}</span>
                    }
                </div>
            </div>

            <div className="flex items-center justify-center">
                <button
                    className="btnPrim btnLoading"
                    disabled={disabled}
                    onClick={handleRequestOTP}
                >
                    {signUp}
                    {
                        isProcessing && <img
                            src="/icons/new/loading.svg"
                            alt="processing"
                            className="w-4 h-4 object-contain"
                        />
                    }
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm;
