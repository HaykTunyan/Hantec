"use client";

import React, {FC, useEffect, useState} from "react";
import {getGetAccOpen, getUserOverview, loginUser} from "@/services";
import {useRouter} from "next/navigation";
import {jwtDecode, JwtPayload} from "jwt-decode";
import RegistrationHeader from "@/components/registration/registrationHeader";
import Input from "@/components/input";
import Link from "next/link";
import Source from "@/components/registration/registrationLive/step3/source";
import {useTranslation} from "next-i18next";
import {useDemo} from "@/context/DemoContext";

interface CustomJwtPayload extends JwtPayload {
    id: string;
}

const LoginPage: FC = () => {
    /**
     *  LoginPage
     */

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [rememberPassword, setRememberPassword] = useState<boolean>(false);
    const [emailPasswordErr, setEmailPasswordErr] = useState<boolean>(false);
    const {t} = useTranslation("log_in");

    const title1 = t("title1");
    const title2 = t("title2");
    const or = t("or");
    const createAccount = t("create_account");
    const emailLabel = t("email_label");
    const passwordLabel = t("password_label");
    const errorUser = t("error_user");
    const remember = t("remember");
    const forgotPassword = t("forgot_password");
    const login = t("buttons.login");

    const {handleSetToLive, handleSetToDemo} = useDemo();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedAccessToken) {
            router.push("/dashboard");
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleToggleRemember = () => {
        setRememberPassword(!rememberPassword);
    };

    const handleLogin = async () => {
        setIsProcessing(true);
        setEmailPasswordErr(false);

        try {
            const loginData = {
                type: "PASSWORD",
                companyId: 20, //
                applicationId: 9,
                loginId: email,
                password,
            };

            const responseData = await loginUser(loginData);
            if (responseData.status === "success") {
                const allTokens = responseData.data;
                const decoded = jwtDecode<CustomJwtPayload>(allTokens.accessToken);
                if (typeof window !== "undefined") {
                    // localStorage.setItem("tokenData", responseData.data);
                    localStorage.setItem("accessToken", allTokens.accessToken);
                    localStorage.setItem("refreshToken", allTokens.refreshToken);
                    localStorage.setItem("user_id", decoded.id);
                    localStorage.setItem("alreadyRated", "no");
                }

                getGetAccOpen().then((res: any) => {
                    if (res && res.data && res.data.idDocument) {
                        setIsProcessing(false);
                        router.push("/dashboard");
                        handleSetToLive();
                        return;
                    }

                    getUserOverview().then((resp) => {
                        if (resp && resp.data) {
                            const hasDemoAccounts = resp.data.demoAccounts.length > 0;
                            const hasLiveAccounts = resp.data.liveAccounts.length > 0;

                            if (hasDemoAccounts && !hasLiveAccounts) {
                                handleSetToDemo();
                            } else {
                                handleSetToLive();
                            }
                        }

                        setIsProcessing(false);
                        router.push("/dashboard");
                    })
                        .catch(() => {
                            setIsProcessing(false);
                            handleSetToLive();
                            router.push("/dashboard");
                        });
                });
            } else if (
                responseData &&
                responseData.msg === "ERROR_INVALID_ID_OR_PASSWORD"
            ) {
                setEmailPasswordErr(true);
                setIsProcessing(false);
            }
        } catch (error) {
            if (error) {
                new Error("Error during login:", error);
            }
        }
    };

    const disabled = !email || !password || isProcessing;

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleLogin();
            }
        };

        window.addEventListener("keydown", handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        };
    }, [email, password]);

    if (isLoading) return;

    return (
        <div className="w-full  flex flex-col bg-grey-exrta-ligth-extra">
            <div className={`h-2 bg-default defaultWidth`}></div>
            <div
                className="flex py-6 tablet:pt-0 px-8 tablet:px-0 flex-col justify-between gap-10 tablet:gap-12"
                style={{minHeight: "calc(100vh - 8px)"}}
            >
                <RegistrationHeader login={false}/>
                <div className="max-w-[376px] tablet:px-6 w-full mx-auto flex flex-col gap-10">
                    <div className="flex flex-col gap-2.5 text-center tablet:px-6">
            <span className="text-48-32 font-medium text-default">
              {title1} <br/> {title2}
            </span>
                        <span className="text-18-16-l2 text-grey-seccondary">
              {or}{" "}
                            <Link
                                href={"/registration"}
                                className={"underline custom-underline-tab cursor-pointer"}
                            >
                {createAccount}
              </Link>
            </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5 relative">
                            <label
                                htmlFor="email"
                                className="text-14 tracking-wider text-default"
                            >
                                {emailLabel}
                            </label>
                            <Input
                                errorMsg={emailPasswordErr}
                                htmlFor={"email"}
                                currentValue={email}
                                handleValueChange={(e) => setEmail(e.target.value)}
                                type={"text"}
                                placeholder="&nbsp;"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 relative">
                            <label
                                htmlFor="password"
                                className="text-14 tracking-wider text-default"
                            >
                                {passwordLabel}
                            </label>
                            <Input
                                errorMsg={emailPasswordErr}
                                htmlFor={"password"}
                                currentValue={password}
                                handleValueChange={(e) => setPassword(e.target.value)}
                                type={`${isPasswordVisible ? "text" : "password"}`}
                                placeholder="&nbsp;"
                            />
                            <svg
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-3.5 top-9 cursor-pointer"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.66699 9.99935C1.66699 9.99935 4.6973 4.16602 10.0003 4.16602C15.3034 4.16602 18.3337 9.99935 18.3337 9.99935C18.3337 9.99935 15.3034 15.8327 10.0003 15.8327C4.6973 15.8327 1.66699 9.99935 1.66699 9.99935Z"
                                    stroke="#686765"
                                    strokeWidth="1.25"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.99967 11.6673C10.9201 11.6673 11.6663 10.9211 11.6663 10.0007C11.6663 9.08018 10.9201 8.33398 9.99967 8.33398C9.0792 8.33398 8.33301 9.08018 8.33301 10.0007C8.33301 10.9211 9.0792 11.6673 9.99967 11.6673Z"
                                    stroke="#686765"
                                    strokeWidth="1.25"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {emailPasswordErr && (
                            <span className={"text-11 text-error"}>{errorUser}</span>
                        )}
                        <div className={"flex items-center justify-between w-full"}>
                            <div className={"flex items-center cursor-pointer"}>
                                <Source
                                    value={remember}
                                    isChecked={rememberPassword}
                                    onToggle={() => handleToggleRemember()}
                                />
                                {/*<span className={"text-14 text-default font-medium"}></span>*/}
                            </div>
                            <Link
                                href={"/forgot"}
                                className={
                                    "text-14 text-grey-seccondary font-medium cursor-pointer"
                                }
                            >
                                {forgotPassword}
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="btnPrim btnLoading"
                            disabled={disabled}
                            onClick={handleLogin}
                        >
                            {login}
                            {isProcessing && (
                                <img
                                    src="/icons/new/loading.svg"
                                    alt="processing"
                                    className="w-4 h-4 object-contain"
                                />
                            )}
                        </button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default LoginPage;
