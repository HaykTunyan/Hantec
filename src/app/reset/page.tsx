"use client";

import React, { Suspense, useEffect, useState } from "react";
import RegistrationHeader from "@/components/registration/registrationHeader";
import RegistrationFooter from "@/components/registration/registrationFooter";
import Input from "@/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { resetTradingPassword } from "@/api/trading/resetTradingPassword";
import { resetAccountPassword } from "@/api/profile/resetAccountPassword";
import { useTranslation } from "next-i18next";

const Reset = () => {

  /**
   *  Rest Hooks Component.
   */

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [atLeast8Characters, setAtLeast8Characters] = useState<boolean>(false);
  const [atLeastOneLetter, setAtLeastOneLetter] = useState<boolean>(false);
  const [atLeastOneNumber, setAtLeastOneNumber] = useState<boolean>(false);
  const passwordMinLength = 8;
  const isPasswordValid =
    atLeast8Characters && atLeastOneLetter && atLeastOneNumber;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [passwordMatchErr, setPasswordMatchErr] = useState<boolean>(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState<boolean>(false);
  const [tradingAccountNumber, setTradingAccountNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const { t } = useTranslation("reset_user");

  const disabled =
    !password ||
    !passwordRepeat ||
    !isPasswordValid ||
    isProcessing ||
    passwordMatchErr;

  useEffect(() => {
    setIsProcessing(true);
    const storedAccessToken = localStorage.getItem("accessToken");
    const tokenInUrl = searchParams.get("p");

    if (tokenInUrl) {
      setToken(tokenInUrl);
      const decoded: any = jwtDecode(tokenInUrl);

      if (decoded.receiver && decoded.id) {
        setEmail(decoded.receiver);
        setTradingAccountNumber(decoded.accountCode);
        setIsProcessing(false);
        setIsLoading(false);
      } else {
        if (storedAccessToken) {
          router.push("/dashboard");
          return;
        }

        router.push("/login");
      }
    } else {
      if (storedAccessToken) {
        router.push("/dashboard");
        return;
      }

      router.push("/login");
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (passwordRepeat !== password) {
      setPasswordMatchErr(true);
    } else {
      setPasswordMatchErr(false);
    }
  }, [passwordRepeat]);

  useEffect(() => {
    if (password === passwordRepeat) {
      setPasswordMatchErr(false);
    } else if (passwordRepeat) {
      setPasswordMatchErr(true);
    }
    setAtLeast8Characters(password.length >= passwordMinLength);
    setAtLeastOneLetter(/[a-zA-Z]/.test(password));
    setAtLeastOneNumber(/[0-9]/.test(password));
  }, [password]);

  if (isLoading) return;

  const handleSubmitPasswordReset = () => {
    setIsProcessing(true);

    if (tradingAccountNumber) {
      resetTradingPassword(token, password, passwordRepeat).then(() => {
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedAccessToken) {
          router.push("/dashboard");
          return;
        }

        router.push("/login");
      });
    } else {
      resetAccountPassword(token, password, passwordRepeat).then(() =>
        router.push("login")
      );
    }
  };

  return (
    <div className="w-full  flex flex-col bg-grey-exrta-ligth-extra">
      <div className={`h-2 bg-default defaultWidth`}></div>
      <div
        className="flex py-6 tablet:pt-0 px-8 tablet:px-0 flex-col justify-between gap-10 tablet:gap-12"
        style={{ minHeight: "calc(100vh - 8px)" }}
      >
        <RegistrationHeader />
        <div className="max-w-[376px] tablet:px-6 w-full mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2.5 text-center tablet:px-6">
            <span className="text-48-32 font-medium text-default">
              {t("title")}
            </span>
            <span className="text-18-16-l2 text-grey-seccondary">
              {t("description")}
            </span>
          </div>
          <div
            className={
              "w-full p-6 flex flex-col rounded-8 bg-orange-extra-light text-14_16 tracking-[0.28px] text-grey-seccondary"
            }
          >
            {tradingAccountNumber && (
              <span>
                {t("for_acc_trading")}{" "}
                <span className={"text-default"}>
                  no. {tradingAccountNumber}
                </span>
              </span>
            )}
            <span>
              {tradingAccountNumber ? t("associated_email") : t("for_acc")}{" "}
              <span className={"text-default"}>{email}</span>
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="password"
                className="text-14 tracking-wider text-default"
              >
                {t("password_label")}
              </label>
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
              <div className="flex flex-col p-4 rounded-[4px] gap-1 border border-grey-extra-light">
                <span className="text-14 text-green-check tracking-wider mb-1">
                  {t("errors.title")}
                </span>
                <div className="flex items-center gap-1 h-4">
                  <span
                    className={`text-14 tracking-wider ${
                      atLeast8Characters
                        ? "text-green-extra-dark"
                        : "text-error"
                    }`}
                  >
                    {t("errors.8_characters")}
                  </span>
                  {atLeast8Characters && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                        fill="#2B2A28"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-1 h-4">
                  <span
                    className={`text-14 tracking-wider ${
                      atLeastOneLetter ? "text-green-extra-dark" : "text-error"
                    }`}
                  >
                    {t("errors.1_letter")}
                  </span>
                  {atLeastOneLetter && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                        fill="#2B2A28"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-1 h-4">
                  <span
                    className={`text-14 tracking-wider ${
                      atLeastOneNumber ? "text-green-extra-dark" : "text-error"
                    }`}
                  >
                    {t("errors.1_number")}
                  </span>
                  {atLeastOneNumber && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 4.70711L6.1465 12.5606L1.62628 8.04044L2.33338 7.33333L6.1465 11.1464L13.2929 4L14 4.70711Z"
                        fill="#2B2A28"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="passwordRpt"
                className="text-14 tracking-wider text-default"
              >
                {t("confirm_password")}
              </label>
              <Input
                htmlFor={"passwordRpt"}
                currentValue={passwordRepeat}
                handleValueChange={(e) => setPasswordRepeat(e.target.value)}
                type={`${isPasswordVisible2 ? "text" : "password"}`}
                placeholder="&nbsp;"
              />
              <svg
                onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
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
              {passwordMatchErr && (
                <span className={"text-11 text-error"}>
                  {t("passwords_match_error")}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="btnPrim btnLoading"
              disabled={disabled}
              onClick={handleSubmitPasswordReset}
            >
              {t("buttons.reset")}
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
        <RegistrationFooter />
      </div>
    </div>
  );
};

const ResetPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Reset />
  </Suspense>
);

export default ResetPage;
