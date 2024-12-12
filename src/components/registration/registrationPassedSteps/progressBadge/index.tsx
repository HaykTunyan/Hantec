import React from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";

interface IProgressBadge {
    isPassed: boolean;
    icon: string;
    processTime: number;
    title: string;
    description: string;
}

const ProgressBadge = ({isPassed, icon, processTime, title, description}: IProgressBadge) => {
    const {t} = useTranslation("onboarding");
    const verifyBadge: any = t("dashboard_info", {returnObjects: true});

    return (
        <Link
            href={"/registration/register-live-account"}
            className={`
            w-full p-4 border border-sidebar-info rounded-[8px] flex flex-col justify-between gap-12 cursor-pointer progressBadge
            ${isPassed ? "bg-grey-exrta-ligth-extra pointer-events-none" : ""}
            `}>
            {
                isPassed
                    ? <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="12" fill="#2B2A28"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M18.9468 8.24641L9.77284 17.4204L4.49259 12.1402L5.31858 11.3142L9.77284 15.7684L18.1208 7.42041L18.9468 8.24641Z"
                                  fill="#F8F8F7"/>
                        </svg>
                    </div>
                    : <div className="w-full flex items-center justify-between">
                        <img src={`/icons/new/${icon}.svg`} alt=""/>
                        <button className="btnSec btnTime">
                            {processTime} {verifyBadge.time}
                        </button>
                    </div>
            }

            <div className="flex flex-col items-start gap-3">
                <span className="text-14 text-default font-medium">{title}</span>
                <span className="text-14_16 text-grey-seccondary tracking-wider">
                    {description}
                </span>
            </div>
        </Link>
    );
};

export default ProgressBadge;
