"use client";

import React, {useEffect, useRef, useState} from "react";
import Button from "@/components/button";
import SidebarInfo from "@/components/trading/downloadCenter/sidebarInfo";
import SidebarInfoTrade from "@/components/trading/downloadCenter/sidebarInfoTrade";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {useTranslation} from "next-i18next";

const DownloadCenterComp = () => {
    const [isDiscoverMoreOpened, setIsDiscoverMoreOpened] = useState<boolean>(false);
    const [isDiscoverMore2Opened, setIsDiscoverMore2Opened] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const mobileSize = 767;

    const {t } = useTranslation("download_center");

    useEffect(() => {
        setIsMobile(window.innerWidth <= mobileSize);
    }, []);

    const sidebarRef1 = useRef(null);
    const sidebarRef2 = useRef(null);

    useOnClickOutside(sidebarRef1, setIsDiscoverMoreOpened);
    useOnClickOutside(sidebarRef2, setIsDiscoverMore2Opened);

    return (
        <div className="py-[70px] tablet:flex-col tablet:gap-0 mobile:pt-10 tablet:pb-[136px] px-8 mobile:px-0 flex gap-8 items-center bg-grey-exrta-ligth-extra">
            <div ref={sidebarRef1}>
                <SidebarInfo
                    isDiscoverMoreOpened={isDiscoverMoreOpened}
                    setIsDiscoverMoreOpened={setIsDiscoverMoreOpened}
                />
            </div>
            <div ref={sidebarRef2}>
                <SidebarInfoTrade
                    isDiscoverMoreOpened={isDiscoverMore2Opened}
                    setIsDiscoverMoreOpened={setIsDiscoverMore2Opened}
                />
            </div>

            <div className="max-w-[682px] mobile:max-w-none w-full mx-auto gap-6 flex flex-col">
                <div className="flex flex-col items-start gap-6 py-2.5 px-2 mobile:px-6">
                    <span className="text-14 text-default">{t("hint")}</span>
                    <span className="text-32-24 text-default">{t("title-first_half")} <br/> {t("title-second_half")}</span>
                </div>
                <div className="rounded-[9px] bg-white p-12 mobile:p-2 mobile:pb-8 flex flex-col gap-8">
                    <img
                        className="w-full rounded-[8px]"
                        src={`/images/downloadCenter/${isMobile ? "bannerMobile" : "banner"}.png`}
                        alt=""
                    />
                    <div className="flex items-start gap-6 mb-4">
                        <div className="w-[86px] h-[88px] flex-0-0-auto-all">
                            <img
                                className="max-w-full rounded"
                                src="/images/downloadCenter/logo.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-24 text-default">{t("mt5.title")}</span>
                            <span className="text-14_16 tracking-wider text-grey-seccondary">
                                {t("mt5.description")}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-14 font-medium text-default">{t("mt5.buttons_title")}</span>
                        <div className="flex flex-wrap items-center justify-between gap-2 mobile:gap-4 mobile:flex-col mobile:items-start">
                            <div className="flex items-center gap-2">
                                <Button
                                    className={"btnSec"}
                                    btnName={"IOS"}
                                    href={"https://apps.apple.com/us/app/metatrader-5/id413251709"}
                                    target={"_blank"}
                                />
                                <Button
                                    className={"btnSec"}
                                    btnName={"Android"}
                                    href={"https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&gl=US"}
                                    target={"_blank"}
                                />
                                <Button
                                    className={"btnSec"}
                                    btnName={t("mt5.buttons.pc_version")}
                                    download={true}
                                    filePath={"https://download.mql5.com/cdn/web/22218/mt5/hantecmarketsv5setup.exe"}
                                />
                            </div>
                            <Button
                                className={"btnPrim"}
                                btnName={t("mt5.buttons.discover_more")}
                                setAction={setIsDiscoverMoreOpened}
                                actionValue={true}
                                setAction2={setIsDiscoverMore2Opened}
                                action2Value={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="rounded-[9px] bg-white p-12 mobile:p-2 mobile:pb-8 flex flex-col gap-8 -mt-2">
                    <img
                        className="w-full rounded-[8px]"
                        src={`/images/downloadCenter/${isMobile ? "tradingCentralBannerMobile" : "tradingCentralBanner"}.png`}
                        alt=""
                    />
                    <div className="flex items-start gap-6 mb-4">
                        <div className="w-[86px] h-[88px] flex-0-0-auto-all">
                            <img
                                className="max-w-full rounded"
                                src="/images/downloadCenter/tradingCentral.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-24 text-default">{t("trading_central.title")}</span>
                            <span className="text-14_16 tracking-wider text-grey-seccondary">
                                {t("trading_central.description")}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-14 font-medium text-default">{t("trading_central.buttons_title")}</span>
                        <div className="flex flex-wrap mobile:flex-col items-center mobile:items-start justify-between gap-2 mobile:gap-4">
                            <Button
                                className={"btnSec"}
                                btnName={"MT5 Plug-in"}
                                download={true}
                                filePath={"https://mt.tradingcentral.com/download"}
                            />
                            <div className="flex items-center gap-2">
                                <Button
                                    className={"btnPrim"}
                                    btnName={t("trading_central.buttons.discover_more")}
                                    setAction={setIsDiscoverMore2Opened}
                                    actionValue={true}
                                    setAction2={setIsDiscoverMoreOpened}
                                    action2Value={false}
                                />
                                {/*<Button*/}
                                {/*    className={"btnPrim"}*/}
                                {/*    btnName={"Login to Trading Central"}*/}
                                {/*    href={"/trading/trade-terminal"}*/}
                                {/*    target={"_blank"}*/}
                                {/*    backGround={"#FF3F32"}*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`transition-box ${isDiscoverMoreOpened || isDiscoverMore2Opened ? "open" : ""} bg-transparent h-[400px] flex-0-0-auto-all mobile:hidden`}>
            </div>
        </div>
    );
};

export default DownloadCenterComp;
