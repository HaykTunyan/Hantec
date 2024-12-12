"use client";

import React, {useEffect, useState} from "react";
import StepsInfo from "@/components/registration/registrationLive/stepsInfo";
import Instructions from "@/components/registration/registrationLive/instructions";
import DesktopOrMobileChoose from "@/components/registration/registrationLive/desktopOrMobileChoose";
import Disclaimer from "@/components/registration/registrationLive/disclaimer";
import ManualVerification from "@/components/registration/registrationLive/manualVerification";
import DesktopOrMobileChooseStep2 from "@/components/registration/registrationLive/desktopOrMobileChooseStep2";
import ManualVerificationStep2 from "@/components/registration/registrationLive/manualVerificationStep2";
import OnboardingStep3 from "@/components/registration/registrationLive/step3";
import Finish from "@/components/registration/registrationLive/finish";
import {scrollToTop} from "@/hooks/scrollToTop";
import {getClientInfo} from "@/api/registration/getClientInfo";
import {useRouter} from "next/navigation";
import {getData} from "@/api/registration/getData";
import {getAccountOpen} from "@/api/registration/getAccountOpen";
import {updateAccountOpen} from "@/api/registration/updateAccountOpen";
import {useDispatch} from "react-redux";
import {setManualOngoing} from "@/store/slices/applicationSlice";
import {updatePersonalInfo} from "@/api/registration/updatePersonalInfo";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {useTranslation} from "next-i18next";

interface CustomJwtPayload extends JwtPayload {
    id: string;
    loginId: string;
}

const Onboarding = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSplashScreen, setIsSplashScreen] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const splashScreenDuration = 1500;
    const fadeOutDuration = 500;
    const [selectedTab, setSelectedTab] = useState<string>("steps");
    const initialWidth = 33;
    const middleWidth = 66;
    const fullWidth = 100;
    const [lineWidth, setLineWidth] = useState<number>(0);
    const [heading, setHeading] = useState<string>("");
    const [stepName, setStepName] = useState<string>("");
    const [accOpenId, setAccOpenId] = useState<number>();
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
    const [onGoingApplication, setOnGoingApplication] = useState<any>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [redirectToDashboard, setRedirectTODashboard] =
        useState<boolean>(false);
    const [idDuplicateErr, setIdDuplicateErr] = useState<string>("");
    // const [countryCodes, setCountryCodes] = useState<any>([]);
    const [countriesList, setCountriesList] = useState<any>([]);

    const {t} = useTranslation("onboarding");
    const mainEvent: any = t("main_event", {returnObjects: true});

    useEffect(() => {
        getData().then((res) => {
            if (res) {
                setCountriesList(
                    res.data.data
                        .filter((i: any) => i.type === "N")
                        .sort((a: any, b: any) => a.desc.localeCompare(b.desc))
                );
                // setCountryCodes(res.data.data
                //     .filter((i: any) => i.type === "C")
                //     .sort((a: any, b: any) => a.desc.localeCompare(b.desc))
                // );
            }
        });
    }, []);

    useEffect(() => {
        getClientInfo().then((res) => {
            if (res) {
                const pending = res.data.data.filter(
                    (i: any) => i.status === "Pending" && i.appType === "acc-open"
                );
                if (pending.length === 0) {
                    setRedirectTODashboard(true);
                    return;
                }
                setOnGoingApplication(pending[0]);
                setAccOpenId(pending[0].id);
                setIsOpen(true);
            }
        });
    }, []);

    useEffect(() => {
        if (!accOpenId) return;

        const accessToken = localStorage.getItem("accessToken")!;
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        const currentEmail = decoded.loginId;

        getClientInfo().then((response2) => {
            if (response2) {
                const pending = response2.data.data.filter(
                    (i: any) => i.status === "Pending" && i.appType === "acc-open"
                );
                updatePersonalInfo({email: currentEmail}, pending[0].id);
            }
        });
    }, [accOpenId]);

    useEffect(() => {
        if (redirectToDashboard) {
            router.push("/dashboard");
        }
    }, [redirectToDashboard]);

    useEffect(() => {
        setLineWidth(initialWidth);
        setTimeout(() => {
            setFadeOut(true);
            setFadeIn(true);
            setTimeout(() => {
                setIsSplashScreen(false);
            }, fadeOutDuration);
        }, splashScreenDuration);
    }, []);

    useEffect(() => {
        scrollToTop();
        if (selectedTab === "steps") {
            setHeading(
                `${mainEvent.account_verification_steps.description1} <br/> ${mainEvent.account_verification_steps.description2}`
            );
            setStepName("");
        }
        if (
            selectedTab === "instructions" ||
            selectedTab === "choose-platform" ||
            selectedTab === "continue-here" ||
            selectedTab === "manual-verification"
        ) {
            setLineWidth(initialWidth);
            setHeading(
                `${mainEvent.id_verify.description1} <br/> ${mainEvent.id_verify.description2}`
            );
            setStepName(mainEvent.account_verification_steps.account_verify);
        }

        if (
            selectedTab === "steps2" ||
            selectedTab === "continue-here2" ||
            selectedTab === "manual_address"
        ) {
            setLineWidth(middleWidth);
            setHeading(
                `${mainEvent.address_verify.description1} <br/> ${mainEvent.address_verify.description2}`
            );
            setStepName(mainEvent.address_verify.title);
        }

        if (selectedTab === "steps3") {
            setLineWidth(fullWidth);
            setHeading(mainEvent.account_verification_steps.steps[2].title);
            setStepName(t("main_event.net_worth_verify.title"));
        }
        if (selectedTab === "steps4") {
            setLineWidth(fullWidth);
            setHeading(`Select which platform <br/> you want to trade on`);
            setStepName("Trading Platform");
        }
    }, [selectedTab]);

    useEffect(() => {
        if (onGoingApplication.status === "Pending") {
            getAccountOpen(onGoingApplication.id).then((data) => {
                const application = data?.data.data;
                if (
                    application.personalInfo?.mobileNo &&
                    application.personalInfo?.countryMobileNo
                ) {
                    setSelectedTab("instructions");
                }
                if (
                    application.personalInfo?.idType &&
                    application.personalInfo?.idNo
                ) {
                    setSelectedTab("disclaimer2");
                }
                if (application.personalInfo?.addrResidential1) {
                    setSelectedTab("steps3");
                }
                // if (application.statusId && application.statusId >= 1) {
                //     targetProgress = 6;
                // }
            });
        } else if (
            onGoingApplication?.status === "Submitted" ||
            onGoingApplication?.status === "Checked"
        ) {
            getAccountOpen(onGoingApplication.id).then((data) => {
                const application = data?.data.data;
                if (
                    application.investmentInfo?.annualIncome &&
                    application.investmentInfo?.netWorth
                ) {
                    dispatch(setManualOngoing(true));
                } else {
                    setSelectedTab("steps3");
                }
            });
        } else if (onGoingApplication?.status === "Approved") {
            router.push("/dashboard");
        }
    }, [isOpen]);

    useEffect(() => {
        if (!accOpenId) return;

        if (selectedTab === "choose-platform") {
            setIntervalId(
                setInterval(() => {
                    getAccountOpen(accOpenId).then((data) => {
                        if (data) {
                            const application = data.data.data;
                            if (application.commRemarks === "AS-314") {
                                setIdDuplicateErr(
                                    "This document has already been registered. Please verify if you have previously used this document to register a trading account."
                                );
                                document
                                    .querySelector("body")
                                    ?.classList.add("bodyOverflowHidden");
                                updateAccountOpen({
                                    id: accOpenId,
                                    commRemarks: "",
                                });
                                return;
                            }
                            if (application.personalInfo?.addrResidential1) {
                                setSelectedTab("steps3");
                            } else if (
                                application.personalInfo?.idType &&
                                application.personalInfo?.idNo
                            ) {
                                setSelectedTab("disclaimer2");
                            }
                        }
                    });
                }, 5000)
            );
        }

        if (selectedTab === "steps2") {
            setIntervalId(
                setInterval(() => {
                    getAccountOpen(accOpenId).then((data) => {
                        if (data) {
                            const application = data.data.data;
                            if (application.personalInfo?.addrResidential1) {
                                setSelectedTab("steps3");
                            }
                        }
                    });
                }, 5000)
            );
        }

        return () => {
            clearInterval(intervalId as any);
        };
    }, [selectedTab, accOpenId]);

    useEffect(() => {
        return () => {
            clearInterval(intervalId as any);
        };
    }, [intervalId]);

    // useEffect(() => {
    //     const changeChatPosition = () => {
    //         const chatWidget = document.getElementById("chat-widget-container");
    //         if (chatWidget) {
    //             chatWidget.classList.add("custom-chat-position");
    //         }
    //     };
    //
    //     setTimeout(() => {
    //         changeChatPosition();
    //     }, 1500);
    //
    //     return () => {
    //         const chatWidget = document.getElementById("chat-widget-container");
    //         chatWidget?.classList.remove("custom-chat-position");
    //     };
    // }, []);

    return (
        <div className="w-full min-h-screen flex">
            {selectedTab === "finish" && <Finish/>}
            {isSplashScreen && (
                <div
                    className={`w-full bg-red-500 flex items-center justify-center ${
                        fadeOut ? "fade-out" : ""
                    }`}
                >
                    <img src="/icons/new/logoSmall.svg" alt=""/>
                </div>
            )}
            {!isSplashScreen && (
                <div className={`w-full flex mainScreen ${fadeIn ? "fade-in" : ""}`}>
                    <div className="w-[42%] tablet:hidden bg-red-500 p-8"></div>
                    <div
                        className="fixed top-0 left-0 bottom-0 w-[42%] tablet:hidden bg-red-500 p-8 pb-0 flex flex-col items-start justify-between">
                        <img src="/icons/new/logoWhite.svg" alt=""/>
                        <div className="flex flex-col gap-2">
                            {stepName && (
                                <span className="text-16 text-white font-medium">
                  {stepName}
                </span>
                            )}
                            <span
                                className="text-48 text-white font-medium"
                                dangerouslySetInnerHTML={{__html: heading}}
                            ></span>
                        </div>
                        <div className="h-[38px] w-full">
                            {(selectedTab === "instructions" ||
                                selectedTab === "choose-platform" ||
                                selectedTab === "continue-here" ||
                                selectedTab === "manual-verification") && (
                                <div className="flex flex-col justify-between w-full h-full">
                                    <span className="text-16 text-white font-medium">
                                        {t("step_name")} 1/3
                                    </span>
                                    <div
                                        className={`
                                        h-2 bg-white defaultWidth
                                        ${
                                            lineWidth === initialWidth
                                                ? "initialWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === middleWidth
                                                ? "middleWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === fullWidth
                                                ? "fullWidth"
                                                : ""
                                        }
                                        `}
                                    ></div>
                                </div>
                            )}
                            {(selectedTab === "steps2" ||
                                selectedTab === "continue-here2" ||
                                selectedTab === "manual_address") && (
                                <div className="flex flex-col justify-between w-full h-full">
                                    <span className="text-16 text-white font-medium">
                                        {t("step_name")} 2/3
                                    </span>
                                    <div
                                        className={`
                                        h-2 bg-white defaultWidth
                                        ${
                                            lineWidth === initialWidth
                                                ? "initialWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === middleWidth
                                                ? "middleWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === fullWidth
                                                ? "fullWidth"
                                                : ""
                                        }
                                        `}
                                    ></div>
                                </div>
                            )}
                            {selectedTab === "steps3" && (
                                <div className="flex flex-col justify-between w-full h-full">
                                    <span className="text-16 text-white font-medium">
                                        {t("step_name")} 3/3
                                    </span>
                                    <div
                                        className={`
                                        h-2 bg-white defaultWidth
                                        ${
                                            lineWidth === initialWidth
                                                ? "initialWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === middleWidth
                                                ? "middleWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === fullWidth
                                                ? "fullWidth"
                                                : ""
                                        }
                                        `}
                                    ></div>
                                </div>
                            )}
                            {(selectedTab === "steps4" ||
                                selectedTab === "continue-here2" ||
                                selectedTab === "manual_address") && (
                                <div className="flex flex-col justify-between w-full h-full">
                  <span className="text-16 text-white font-medium">
                    Step 4/4
                  </span>
                                    <div
                                        className={`
                                        h-2 bg-white defaultWidth
                                        ${
                                            lineWidth === initialWidth
                                                ? "initialWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === middleWidth
                                                ? "middleWidth"
                                                : ""
                                        }
                                        ${
                                            lineWidth === fullWidth
                                                ? "fullWidth"
                                                : ""
                                        }
                                        `}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-[58%] tablet:w-full h-full flex bg-grey-exrta-ligth-extra">
                        {selectedTab === "steps" && (
                            <StepsInfo
                                setSelectedTab={setSelectedTab}
                                accOpenId={accOpenId}
                            />
                        )}
                        {selectedTab === "instructions" && (
                            <Instructions
                                setSelectedTab={setSelectedTab}
                                lineWidth={lineWidth}
                            />
                        )}
                        {selectedTab === "choose-platform" && (
                            <DesktopOrMobileChoose
                                idDuplicateErr={idDuplicateErr}
                                setSelectedTab={setSelectedTab}
                                lineWidth={lineWidth}
                            />
                        )}
                        {/*{*/}
                        {/*    selectedTab === "continue-here"*/}
                        {/*    && <ContinueHere*/}
                        {/*        setSelectedTab={setSelectedTab}*/}
                        {/*        lineWidth={lineWidth}*/}
                        {/*    />*/}
                        {/*}*/}
                        {selectedTab === "manual-verification" && (
                            <ManualVerification
                                accOpenId={accOpenId}
                                countriesList={countriesList}
                                setSelectedTab={setSelectedTab}
                                lineWidth={lineWidth}
                            />
                        )}
                        {selectedTab === "disclaimer2" && (
                            <Disclaimer setSelectedTab={setSelectedTab} forStep={2}/>
                        )}
                        {selectedTab === "steps2" && (
                            <DesktopOrMobileChooseStep2
                                setSelectedTab={setSelectedTab}
                                lineWidth={lineWidth}
                            />
                        )}
                        {selectedTab === "manual_address" && (
                            <ManualVerificationStep2
                                accOpenId={accOpenId}
                                setSelectedTab={setSelectedTab}
                                lineWidth={lineWidth}
                            />
                        )}
                        {selectedTab === "steps3" && (
                            <OnboardingStep3
                                setSelectedTab={setSelectedTab}
                                accOpenId={accOpenId}
                                lineWidth={lineWidth}
                            />
                        )}
                        {/*{*/}
                        {/*    selectedTab === "steps4"*/}
                        {/*    && <OnboardingStep4*/}
                        {/*        setSelectedTab={setSelectedTab}*/}
                        {/*        lineWidth={lineWidth}*/}
                        {/*    />*/}
                        {/*}*/}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
