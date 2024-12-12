"use client";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useTranslation} from "next-i18next";
import {getGetAccOpen} from "@/services";

const RateModal = () => {
    const {t} = useTranslation("rate_modal");

    const [isRateModalVisible, setIsRateModalVisible] = useState<boolean>(false);
    const loginId = useSelector((state: RootState) => state.info.loginId);

    useEffect(() => {
        if (!loginId) {
            return;
        }

        const alreadyRated = localStorage.getItem("alreadyRated");
        const userId = localStorage.getItem("user_id");

        if (alreadyRated === "yes") {
            return;
        }

        if (!userId) {
            return;
        }

        const timeOutTime = 42000;
        getGetAccOpen()
            .then((res: any) => {
                if (res && res.data.approved) {
                    setTimeout(() => {
                        setIsRateModalVisible(true);
                    }, timeOutTime);
                } else {
                    setIsRateModalVisible(false);
                }
            });
    }, [loginId]);

    const handleRedirectToRate = () => {
        localStorage.setItem("alreadyRated", "yes");
        setIsRateModalVisible(false);
        window.open("https://hantec-survey.paperform.co/", "_blank");
    };

    const handleSkipRate = () => {
        setIsRateModalVisible(false);
    };

    useEffect(() => {
        if (isRateModalVisible) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isRateModalVisible]);

    return (
        <>
            {isRateModalVisible && (
                <div className="fixed inset-0 bg-modal-backdrop z-[11111111] flex items-center object-top mobile:px-4">
                    <div
                        className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                        <div className="flex flex-col gap-4 items-center">
                            <img
                                src="/images/rateStars.png"
                                style={{width: "148px"}}
                                alt=""
                            />
                            <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                <span className={"text-20 font-medium"}>
                                  {t("title")}
                                </span>
                                <span className="text-14 text-grey-seccondary tracking-wider">
                                  {t("description")}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button className="btnSec" onClick={handleSkipRate}>
                                {t("buttons.skip")}
                            </button>
                            <button className="btnPrim" onClick={handleRedirectToRate}>
                                {t("buttons.rate_now")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RateModal;
