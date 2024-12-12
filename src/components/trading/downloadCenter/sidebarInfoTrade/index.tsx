import React, {useEffect} from "react";
import Button from "@/components/button";
import InfoBlock from "@/components/trading/downloadCenter/sidebarInfo/infoBlock";
import {useTranslation} from "next-i18next";

interface ISideBarInfo {
    isDiscoverMoreOpened: boolean,
    setIsDiscoverMoreOpened: (x: boolean) => void
}

// const instructions = [
//     "Transaction account net worth of more than $1,000.",
//     `Ensure your account meets the net worth requirement.`,
//     `Apply for a Trading Central account via customer service (csd@hantec.com).`,
//     `Receive your Trading Central account number and password via email once approved.`
// ];

const SideBarInfoTrade = ({isDiscoverMoreOpened, setIsDiscoverMoreOpened}: ISideBarInfo) => {
    const {t } = useTranslation("download_center");
    const featuresTexts: any = t("trading_central.trading_central_sidebar", { returnObjects: true });
    const tradeFeaturesTexts: any = t("trading_central.trading_central_sidebar.key_features.features", { returnObjects: true });

    const tradeFeatures = [
        {
            icon: "analysts",
            title: tradeFeaturesTexts[0].title,
            description: tradeFeaturesTexts[0].description,
        },
        {
            icon: "adaptiveCharts",
            title: tradeFeaturesTexts[1].title,
            description: tradeFeaturesTexts[1].description,
        },
        {
            icon: "adaptive",
            title: tradeFeaturesTexts[2].title,
            description: tradeFeaturesTexts[2].description,
        },
        {
            icon: "realTime",
            title: tradeFeaturesTexts[3].title,
            description: tradeFeaturesTexts[3].description,
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
            transition-box2 pb-16
            ${isDiscoverMoreOpened ? "open2" : "close2"} 
            fixed top-0 right-0 bg-white h-full flex flex-col gap-14 flex-0-0-auto-all tablet:pb-[136px];
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
                            src="/images/downloadCenter/tradingCentral.png"
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-24 text-default">{featuresTexts.title}</span>
                        <span className="text-14_16 tracking-wider text-grey-seccondary">
                            {featuresTexts.description}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-14_16 text-grey-seccondary">{featuresTexts.key_features.title}</span>
                    <div className="flex flex-col">
                        {
                            tradeFeatures.map((feature, index) =>
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
                {/*<AdditionalInfo*/}
                {/*    title={"Instructions to Apply:"}*/}
                {/*    instructions={instructions}*/}
                {/*    button={true}*/}
                {/*/>*/}
                <div className="flex flex-col gap-4">
                    <span className="text-14 font-medium text-default">{featuresTexts.key_features.instructions.download}</span>
                    <div className="flex items-center justify-between w-full gap-2">
                        <Button
                            className={"btnSec"}
                            btnName={`MT5 ${featuresTexts.key_features.instructions.buttons.plug_in}`}
                            download={true}
                            filePath={"https://mt.tradingcentral.com/download"}
                        />
                        <Button
                            className={"btnPrim"}
                            btnName={featuresTexts.key_features.instructions.buttons.how_to_use}
                            href={"/trading/download-center/plugin-installation-guide"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarInfoTrade;
