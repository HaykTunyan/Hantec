import React, {useEffect} from "react";
import Button from "@/components/button";
import InfoBlock from "@/components/trading/downloadCenter/sidebarInfo/infoBlock";
import AdditionalInfo from "@/components/trading/downloadCenter/sidebarInfo/additionalInfo";
import {useTranslation} from "next-i18next";

interface ISideBarInfo {
    isDiscoverMoreOpened: boolean,
    setIsDiscoverMoreOpened: (x: boolean) => void
}

const SideBarInfo = ({isDiscoverMoreOpened, setIsDiscoverMoreOpened}: ISideBarInfo) => {
    const {t } = useTranslation("download_center");
    const featuresTexts: any = t("mt5.mt5_sidebar.key_features.features", { returnObjects: true });
    const featuresMobileTexts: any = t("mt5.mt5_sidebar.key_features.mobile_version.steps", { returnObjects: true });
    const featuresMobile: any = t("mt5.mt5_sidebar.key_features.mobile_version", { returnObjects: true });

    const instructions = [
        featuresMobileTexts[0],
        featuresMobileTexts[1],
        featuresMobileTexts[2],
        featuresMobileTexts[3]
    ];

    const features = [
        {
            icon: "technical",
            title: featuresTexts[0].title,
            description: featuresTexts[0].description
        },
        {
            icon: "trade",
            title: featuresTexts[1].title,
            description: featuresTexts[1].description
        },
        {
            icon: "coverage",
            title: featuresTexts[2].title,
            description: featuresTexts[2].description
        },
        {
            icon: "charts",
            title: featuresTexts[3].title,
            description: featuresTexts[3].description
        },
        {
            icon: "oneClick",
            title: featuresTexts[4].title,
            description: featuresTexts[4].description
        },
        {
            icon: "enhanced",
            title: featuresTexts[5].title,
            description: featuresTexts[5].description
        }
    ];

    useEffect(() => {
        if (isDiscoverMoreOpened) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        } else {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        }
    }, [isDiscoverMoreOpened]);

    return (
        <div
            className={`
            transition-box2 pb-16 tablet:pb-[136px]
            ${isDiscoverMoreOpened ? "open2" : "close2"} 
            fixed top-0 right-0 bg-white h-full flex flex-col gap-14 flex-0-0-auto-all z-[1111111]
            `}
        >
            <div className="flex items-center justify-end pt-2 px-4">
                <Button
                    className={"btnSec btnClose"}
                    icon={"close"}
                    setAction={setIsDiscoverMoreOpened}
                    actionValue={false}
                />
            </div>
            <div className="flex flex-col gap-14 px-10 mobile:px-4">
                <div className="flex items-start gap-6 mb-4">
                    <div className="w-[72px] h-[74px] flex-0-0-auto-all">
                        <img
                            className="max-w-full rounded"
                            src="/images/downloadCenter/logo.png"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-24 text-default">{t("mt5.mt5_sidebar.title")}</span>
                        <span className="text-14_16 tracking-wider text-grey-seccondary">
                            {t("mt5.mt5_sidebar.description")}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-14_16 text-grey-seccondary">{t("mt5.mt5_sidebar.key_features.title")}</span>
                    <div className="flex flex-col">
                        {
                            features.map((feature, index) =>
                                <InfoBlock
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            )
                        }
                    </div>
                </div>
                <AdditionalInfo
                    title={t("mt5.mt5_sidebar.key_features.mobile_version.title")}
                    description={t("mt5.mt5_sidebar.key_features.mobile_version.description")}
                    instructions={instructions}
                />
                <div className="flex flex-col gap-4">
                    <span className="text-14 font-medium text-default">{featuresMobile.download}</span>
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
                            btnName={featuresMobile.buttons.pc_version}
                            download={true}
                            filePath={"https://download.mql5.com/cdn/web/22218/mt5/hantecmarketsv5setup.exe"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarInfo;
