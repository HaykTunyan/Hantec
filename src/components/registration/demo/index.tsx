import React from "react";
import {useTranslation} from "next-i18next";

const DemoHighlight = () => {
    const {t} = useTranslation("demo_dashboard_banner");

    return (
        <div className="w-full bg-blue-20 py-8 px-6 flex flex-col items-start gap-1">
            <span className="text-20 text-default font-medium">{t("title")}</span>
            <span className="text-14_16 text-grey-seccondary tracking-wider">
                {t("description")}
            </span>
        </div>
    );
};

export default DemoHighlight;
