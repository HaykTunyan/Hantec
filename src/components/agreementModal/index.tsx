"use client";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {agreeWithRules} from "@/api/profile/agreeWithRules";
import {setShowAgreement} from "@/store/slices/applicationSlice";
import {useTranslation} from "next-i18next";

const AgreementModal = () => {
    const {t} = useTranslation("onboarding");
    const approvedAgree: any = t("main_event.account_approved", {returnObjects: true});

    const [agreed, setAgreed] = useState<boolean>(false);
    const showAgreement = useSelector((state: RootState) => state.application.showAgreement);
    const dispatch = useDispatch();

    useEffect(() => {
        if (showAgreement) {
            document.querySelector("body")?.classList.add("bodyOverflowHidden");
        }

        return () => {
            document.querySelector("body")?.classList.remove("bodyOverflowHidden");
        };
    }, [showAgreement]);

    const handleAgree = () => {
        agreeWithRules()
            .then(() => {
                dispatch(setShowAgreement(false));
            });
    };

    const disabled = !agreed;

    return (
        <> {
            showAgreement &&
            <div
                className={`fixed w-w-full py-20 inset-0 bg-modal-backdrop z-[11111111] flex items-start object-top mobile:px-4 overflow-x-scroll`}>

                <div
                    className="max-w-[676px] w-full pt-18 pb-16 px-24 mobile:px-8 bg-white mx-auto rounded-8 flex flex-col gap-8 mobile:gap-10">
                    <div className="flex flex-col gap-4 items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8C11.25 8.41421 11.5858 8.75 12 8.75ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25H10.5V11.75H11.25V15.25H10.5C10.0858 15.25 9.75 15.5858 9.75 16C9.75 16.4142 10.0858 16.75 10.5 16.75H13.5V15.25H12.75V11Z"
                                  fill="#2B2A28"/>
                        </svg>
                        <div className="flex flex-col gap-1 text-center max-w-[335px] w-full">
                                        <span
                                            className="text-20-18 font-medium">{approvedAgree.title}</span>
                        </div>
                        <div
                            className={"p-6 flex flex-col gap-6 rounded-8 border border-grey-extra-light w-full text-14_16 text-grey-seccondary tracking-[0.28px]"}>
                            <div className={"flex flex-col"}>
                                <span>{approvedAgree.header}</span>
                                <span>
                                    {approvedAgree.inform}
                                </span>
                            </div>
                            <div className={"flex flex-col gap-3"}>
                                <span
                                    className={"font-medium text-default"}>{approvedAgree.notices_opening.title}</span>
                                <div className={"flex gap-3 items-start"}>
                                    <span>01</span>
                                    <span>
                                        {approvedAgree.notices_opening.steps[0]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>02</span>
                                    <span>
                                        {approvedAgree.notices_opening.steps[1]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>03</span>
                                    <span>
                                        {approvedAgree.notices_opening.steps[2]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>04</span>
                                    <span>
                                        {approvedAgree.notices_opening.steps[3]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>05</span>
                                    <span>
                                        {approvedAgree.notices_opening.steps[4]}
                                    </span>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-3"}>
                                <span
                                    className={"font-medium text-default"}>{approvedAgree.notices_management.title}</span>
                                <span>
                                    {approvedAgree.notices_management.description}
                                </span>
                            </div>
                            <div className={"flex flex-col gap-3"}>
                                <span className={"font-medium text-default"}>{approvedAgree.notice_trading.title}</span>
                                <div className={"flex gap-3 items-start"}>
                                    <span>01</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[0]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>02</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[1]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>03</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[2]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>04</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[3]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>05</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[4]}
                                    </span>
                                </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>06</span>
                                    <span>
                                        {approvedAgree.notice_trading.steps[5]}
                                    </span>
                                </div>
                            </div>
                            <div className={"flex flex-col gap-3"}>
                                <span className={"font-medium text-default"}>{approvedAgree.notice_risk.title}</span>
                                <div className={"flex gap-3 items-start"}>
                                    <span>01</span>
                                    <span>
                                        {approvedAgree.notice_risk.steps[0]}
                                    </span>
                                    </div>
                                <div className={"flex gap-3 items-start"}>
                                    <span>02</span>
                                    <span>
                                        {approvedAgree.notice_risk.steps[1]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-2.5 cursor-pointer self-center"
                        onClick={() => setAgreed(!agreed)}
                    >
                        {
                            agreed
                                ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z"
                                        fill="#FF3F32"/>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M16.1554 6.78039L8.46597 14.4698L3.84473 9.84857L4.90539 8.78791L8.46597 12.3485L15.0947 5.71973L16.1554 6.78039Z"
                                          fill="white" fillOpacity="0.8"/>
                                </svg>
                                : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2Z"
                                        stroke="#E8E5E1"/>
                                </svg>
                        }
                        <span className="text-14 font-medium text-default tracking-wider">{approvedAgree.agreement}</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <button
                            className="btnPrim"
                            onClick={handleAgree}
                            disabled={disabled}
                        >
                            {approvedAgree.buttons.confirm}
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default AgreementModal;
