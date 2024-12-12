import React from "react";
import Button from "@/components/button";
import {useTranslation} from "next-i18next";

interface ISideBarInfo {
    isDiscoverMoreOpened: boolean,
    setIsDiscoverMoreOpened: (x: boolean) => void
}

const SideBarInfoTrade = ({isDiscoverMoreOpened, setIsDiscoverMoreOpened}: ISideBarInfo) => {
    const {t} = useTranslation("leverage_level");
    const riskWarning :any = t("risk_warning.sidebar", {returnObjects: true});

    return (
        <div
            className={`
            transition-box3 pb-16 z-[111111111111]
            ${isDiscoverMoreOpened ? "open2" : "close2"} 
            fixed top-0 right-0 bg-white h-full flex flex-col gap-14 flex-0-0-auto-all
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
            <div className="flex flex-col gap-8 px-10 mobile:px-4">
                <span className={"text-24-18 text-default font-medium"}>{riskWarning.title}</span>
                <div className={"flex flex-col gap-6 p-6 border border-grey-extra-light rounded-8"}>
                    <span className={"text-14_16 text-grey-seccondary"}>{riskWarning.header},</span>
                    <div className={"flex flex-col gap-3"}>
                        <div className={"flex items-start gap-3"}>
                            <span className={"text-14 text-grey-seccondary pt-[2px] w-[18px] flex-0-0-auto-all"}>01</span>
                            <span className={"text-14_16 text-grey-seccondary tracking-wider"}>
                                {riskWarning.steps[0]}
                            </span>
                        </div>
                        <div className={"flex items-start gap-3"}>
                            <span className={"text-14 text-grey-seccondary pt-[2px] w-[18px] flex-0-0-auto-all"}>02</span>
                            <span className={"text-14_16 text-grey-seccondary tracking-wider"}>
                                {riskWarning.steps[1]}
                            </span>
                        </div>
                        <div className={"flex items-start gap-3"}>
                            <span className={"text-14 text-grey-seccondary pt-[2px] w-[18px] flex-0-0-auto-all"}>03</span>
                            <span className={"text-14_16 text-grey-seccondary tracking-wider"}>
                                {riskWarning.steps[2]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarInfoTrade;
