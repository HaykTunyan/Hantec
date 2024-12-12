"use client";

import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/registration/registrationHeader";
import Input from "@/components/input";
import Link from "next/link";
import {sendVerificationEmail} from "@/api/registration/sendVerificationEmail";
import {useTranslation} from "next-i18next";

const ForgotPage: FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const {t} = useTranslation("forgot_login");

    const title1 = t("title1");
    const title2 = t("title2");
    const description = t("description");
    const emailLabel = t("email_label");
    const errorEmail = t("error_email");
    const back = t("buttons.back");
    const send = t("buttons.send");

    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [wrongEmailErr, setWrongEmailErr] = useState<boolean>(false);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedAccessToken) {
            router.push("/dashboard");
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleSendVerificationEmail = async () => {
        setIsProcessing(true);
        setWrongEmailErr(false);

        sendVerificationEmail(email).then((res) => {
            if (res.error && res.error.data?.msg === "ERROR_INVALID_ID_OR_PASSWORD") {
                setWrongEmailErr(true);
                setIsProcessing(false);
            } else if (res.response) {
                router.push("login");
            }
        });
    };

    const disabled = !email || isProcessing;

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleSendVerificationEmail();
            }
        };

        window.addEventListener("keydown", handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        };
    }, [email]);

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
                    <div className="flex flex-col gap-2.5 text-center items-center tablet:px-6">
                      <span className="text-48-32 font-medium text-default">
                        {title1} <br/> {title2}
                      </span>
                        <span className="text-18-16-l2 text-grey-seccondary">
                        {description}
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
                                errorMsg={wrongEmailErr}
                                htmlFor={"email"}
                                currentValue={email}
                                handleValueChange={(e) => setEmail(e.target.value)}
                                type={"text"}
                                placeholder="&nbsp;"
                            />
                        </div>
                        {wrongEmailErr && (
                            <span className={"text-11 text-error"}>{errorEmail}</span>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Link href={"/login"}>
                            <button className={"btnSec"}>{back}</button>
                        </Link>
                        <button
                            className="btnPrim btnLoading"
                            disabled={disabled}
                            onClick={handleSendVerificationEmail}
                        >
                            {send}
                            {isProcessing && (
                                <img
                                    src="/icons/new/loading.svg"
                                    alt="processing"
                                    className="w-4 h-4 object-contain mobile:hidden"
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

export default ForgotPage;
