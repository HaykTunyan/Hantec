"use client";

import React from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/button";
import {useTranslation} from "next-i18next";

const InstallationHelp = () => {
    const router = useRouter();
    const {t} = useTranslation("download_center");

    const installationGuide: any = t("installation_guide", {returnObjects: true});
    const installationGuideWin7: any = t("installation_guide.win7_additional_info", {returnObjects: true});

    return (
        <div className="py-[70px] px-8 tablet:px-4 tablet:pt-0 tablet:pb-[136px] bg-grey-exrta-ligth-extra">
            <div className="max-w-[682px] w-full mx-auto flex flex-col gap-[120px]">
                <div className="flex flex-col gap-12">
                    <div className="flex items-center gap-4 pt-12 pb-2.5">
                        <svg
                            onClick={() => router.back()}
                            className="w-6 h-6 object-contain cursor-pointer"
                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M2.66699 7.85485L7.85382 13.0417L8.56093 12.3346L4.58123 8.35488L14.0407 8.35488V7.35488L4.58117 7.35488L8.56093 3.37507L7.85382 2.66797L2.66699 7.85485Z"
                                  fill="#2B2A28"/>
                        </svg>
                        <span className="text-32-24 text-default font-medium">{installationGuide.title}</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">01</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuide.step1}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">02</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuide.step2}
                                </span>
                            </div>
                            <div className="flex w-[297px] mt-5">
                                <img className="w-full" src="/images/downloadCenter/languageSelect.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">03</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuide.step3}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step3.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">04</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuide.step4}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step4.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">05</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuide.step5}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step5.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">06</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                     {installationGuide.step6}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step6.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">07</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuide.step7}
                            </span>
                        </div>
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">08</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuide.step8}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col items-start gap-3 pt-12 pb-2.5">
                        <span className="text-24 text-default font-medium">{installationGuideWin7.title}</span>
                        <span className="text-14_16 text-grey-seccondary ">
                            {installationGuideWin7.description}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">01</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuideWin7.step1}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">02</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step2}
                                </span>
                            </div>
                            <div className="flex w-[334px] mt-5">
                                <img className="w-full" src="/images/downloadCenter/win7step2.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">03</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step3}
                                </span>
                            </div>
                            <div className="flex w-[625px] tablet:w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/win7step3.png" alt=""/>
                            </div>
                            <div className="flex items-start gap-3 py-6">
                                <span
                                    className="text-14 tracking-wider text-grey-seccondary">{installationGuideWin7.step3_note.note}</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step3_note.note_text}
                                </span>
                            </div>
                            <div className="flex w-[633px] tablet:w-full">
                                <img className="w-full" src="/images/downloadCenter/win7step4.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">04</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuideWin7.step4}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">05</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step5}
                                </span>
                            </div>
                            <div className="flex w-[297px] mt-5">
                                <img className="w-full" src="/images/downloadCenter/languageSelect.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">06</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step6}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step3.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">07</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step7}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step4.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">08</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                   {installationGuideWin7.step8}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step5.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-6 border-b border-grey-extra-light">
                            <div className="flex items-start gap-3">
                                <span className="text-14 tracking-wider text-grey-seccondary">09</span>
                                <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                    {installationGuideWin7.step9}
                                </span>
                            </div>
                            <div className="flex w-full mt-5">
                                <img className="w-full" src="/images/downloadCenter/step6.png" alt=""/>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">10</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                                {installationGuideWin7.step10}
                            </span>
                        </div>
                        <div className="flex items-start gap-3 py-6 border-b border-grey-extra-light">
                            <span className="text-14 tracking-wider text-grey-seccondary">11</span>
                            <span className="text-14_16 font-medium tracking-wider text-grey-seccondary -mt-[1px]">
                               {installationGuideWin7.step11}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 -mt-10">
                    <Button
                        className={"btnSec btnBack"}
                        btnName={installationGuide.buttons.back}
                        goBack={true}
                    />
                    <Button
                        className={"btnPrim"}
                        btnName={installationGuide.buttons.back_to_top}
                        scroll={"0"}
                    />
                </div>
            </div>
        </div>
    );
};

export default InstallationHelp;
