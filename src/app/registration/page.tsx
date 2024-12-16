"use client";

import React, { useEffect, useState } from "react";
import RegistrationHeader from "@/components/registration/registrationHeader";
import RegistrationFooter from "@/components/registration/registrationFooter";
import RegistrationForm from "@/components/registration/registrationForm";
import CodeConfirm from "@/components/registration/codeConfirm";
import RegistrationSuccess from "@/components/registration/registrationSuccess";
import { verifyOTP } from "@/api/registration/verifyOTP";
import validator from "validator";
import { loginUser } from "@/services";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { searchIfEmailExists } from "@/api/registration/searchIfEmailExists";
import { getOTP } from "@/api/registration/getOTP";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  loginId: string;
}

const Registration = () => {
  /**
   *  Registration Hook Component.
   */

  const router = useRouter();
  const [selectedRegistrationTab, setSelectedRegistrationTab] =
    useState<string>("start");
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [atLeast8Characters, setAtLeast8Characters] = useState<boolean>(false);
  const [atLeastOneLetter, setAtLeastOneLetter] = useState<boolean>(false);
  const [atLeastOneNumber, setAtLeastOneNumber] = useState<boolean>(false);
  const [isFullNameValid, setIsFullNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const passwordMinLength = 8;
  const isPasswordValid =
    atLeast8Characters && atLeastOneLetter && atLeastOneNumber;
  const disabled =
    !fullName ||
    !email ||
    !password ||
    isEmailValid ||
    isFullNameValid ||
    !isPasswordValid ||
    isProcessing;
  const [otp, setOTP] = useState<string>("");
  const [otpError, setOTPError] = useState<string>("");
  const [emailExistsErr, setEmailExistsErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { demo, toggleDemo } = useDemo();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginData = {
    type: "PASSWORD",
    companyId: 20,
    applicationId: 9,
    loginId: email,
    password,
  };

  useEffect(() => {
    setAtLeast8Characters(password.length >= passwordMinLength);
    setAtLeastOneLetter(/[a-zA-Z]/.test(password));
    setAtLeastOneNumber(/[0-9]/.test(password));
  }, [password]);

  useEffect(() => {
    if (!fullName) {
      setIsFullNameValid(false);
      return;
    }

    const regexFullName = /^[\p{L} ]+$/u;
    if (!regexFullName.test(fullName)) {
      setIsFullNameValid(true);
    } else {
      setIsFullNameValid(false);
    }
  }, [fullName]);

  useEffect(() => {
    if (!email) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(!validator.isEmail(email));
    }
  }, [email]);

  const initialWidth = 25;
  const middleWidth = 50;
  const fullWidth = 100;

  const [lineWidth, setLineWidth] = useState<number>(0);

  useEffect(() => {
    setLineWidth(initialWidth);
  }, []);

  useEffect(() => {
    if (selectedRegistrationTab === "code-confirm") {
      setLineWidth(middleWidth);
      return;
    }
    if (selectedRegistrationTab === "registration-success") {
      setLineWidth(fullWidth);
      return;
    }
  }, [selectedRegistrationTab]);

  const handleNewAccount = async () => {
    const statusError = 200;
    const backendUrl =
      "https://rinex-portal-uat.hantecgroup.com/api/as/basic-acc-open";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "en-US",
        },
        body: JSON.stringify({
          companyId: 20,
          appId: 9,
          region: "AFRICA",
          aeCode: 4010,
          name: fullName,
          email: email,
          password: password,
          passwordConfirm: password,
          appDate: new Date(),
          platformCode: "MT4_UAT",
          accCurrency: "USD",
          messageMappings: [
            {
              statusId: 2,
              messageId: 30000,
            },
            {
              statusId: 2,
              messageId: 30001,
            },
          ],
          accOpenMessageMappings: [
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
          autoApprove: true,
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

  const handleRequestOTP = () => {
    setIsProcessing(true);
    const requestBody = {
      action: "VERIFY",
      companyId: 20,
      applicationId: 9,
      receiver: email,
      receiverType: 1,
    };

    searchIfEmailExists(email, 20).then((res) => {
      if (res && res.data.length > 0 && res.data.includes("email")) {
        setEmailExistsErr(
          "Email is already in use. Please try a different one or log in to your account."
        );
        setIsProcessing(false);
      } else {
        setEmailExistsErr("");
        getOTP(requestBody).then((resp) => {
          if (resp) {
            setSelectedRegistrationTab("code-confirm");
            setIsProcessing(false);
          }
        });
      }
    });
  };

  const handleVerifyOTP = () => {
    setIsProcessing(true);
    const verifyBody = {
      action: "VERIFY",
      companyId: 20,
      applicationId: 9,
      receiver: email,
      otp,
    };

    verifyOTP(verifyBody).then((res) => {
      if (res && res.data.status === "success") {
        handleNewAccount().then((resp) => {
          if (resp && resp.data.status === "success") {
            setIsProcessing(false);
            setSelectedRegistrationTab("registration-success");
            setOTPError("");
            if (demo) {
              toggleDemo();
            }
            loginUser(loginData).then((response) => {
              if (response.status === "success") {
                const allTokens = response.data;
                const decoded = jwtDecode<CustomJwtPayload>(
                  allTokens.accessToken
                );

                if (typeof window !== "undefined") {
                  localStorage.setItem("accessToken", allTokens.accessToken);
                  localStorage.setItem("refreshToken", allTokens.refreshToken);
                  localStorage.setItem("user_id", decoded.id);
                }
              }
            });
          }
        });
      } else {
        setOTPError("The code you entered is incorrect. Please try again.");
        setIsProcessing(false);
      }
    });
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  if (isLoading) return;

  return (
    <div className="w-full  flex flex-col bg-grey-exrta-ligth-extra">
      <div
        className={`
                h-2 bg-default defaultWidth
                ${lineWidth === initialWidth ? "initialWidth" : ""}
                ${lineWidth === middleWidth ? "middleWidth" : ""}
                ${lineWidth === fullWidth ? "fullWidth" : ""}
                `}
      ></div>
      <div
        className="flex py-6 tablet:pt-0 px-8 tablet:px-0 flex-col justify-between gap-10 tablet:gap-12"
        style={{ minHeight: "calc(100vh - 8px)" }}
      >
        <RegistrationHeader
          login={true}
          isDemo={isDemo}
          setIsDemo={setIsDemo}
          selectedRegistrationTab={selectedRegistrationTab}
        />
        {selectedRegistrationTab === "start" && (
          <RegistrationForm
            emailExistsErr={emailExistsErr}
            atLeast8Characters={atLeast8Characters}
            atLeastOneNumber={atLeastOneNumber}
            atLeastOneLetter={atLeastOneLetter}
            isEmailValid={isEmailValid}
            isFullNameValid={isFullNameValid}
            disabled={disabled}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            password={password}
            setPassword={setPassword}
            isProcessing={isProcessing}
            handleRequestOTP={handleRequestOTP}
          />
        )}
        {selectedRegistrationTab === "code-confirm" && (
          <CodeConfirm
            otpError={otpError}
            isProcessing={isProcessing}
            setOTP={setOTP}
            handleVerifyOTP={handleVerifyOTP}
            handleRequestOTP={handleRequestOTP}
          />
        )}
        {selectedRegistrationTab === "registration-success" && (
          <RegistrationSuccess isDemo={false} />
        )}
        <RegistrationFooter />
      </div>
    </div>
  );
};

export default Registration;
