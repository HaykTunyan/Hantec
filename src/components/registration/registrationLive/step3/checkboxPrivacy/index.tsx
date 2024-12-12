import React from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";

interface ISource {
    onToggle: () => void;
    isChecked: boolean;
    position?: string;
    valueColor?: string;
    fontWeight?: string;
}

const Source = ({onToggle, isChecked, position, valueColor, fontWeight}: ISource) => {
    const {t} = useTranslation("onboarding");
    const terms: any = t("main_event.net_worth_verify.terms", {returnObjects: true});

    return (
        <div
            className={`flex ${position ? `items-${position}` : "items-center"} gap-2.5 cursor-pointer`}
            onClick={onToggle}
        >
            {
                isChecked
                    ? <svg
                        className={"flex-0-0-auto-all"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z"
                            fill="#FF3F32"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M16.1554 6.78039L8.46597 14.4698L3.84473 9.84857L4.90539 8.78791L8.46597 12.3485L15.0947 5.71973L16.1554 6.78039Z"
                              fill="white" fillOpacity="0.8"/>
                    </svg>
                    : <svg
                        className={"flex-0-0-auto-all"}
                        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H18C18.8284 0.5 19.5 1.17157 19.5 2V18C19.5 18.8284 18.8284 19.5 18 19.5H2C1.17157 19.5 0.5 18.8284 0.5 18V2Z"
                            stroke="#E8E5E1"/>
                    </svg>
            }
            <span className={`
            text-14 
            ${fontWeight ? `font-${fontWeight}` : "font-medium"}
            ${valueColor ? `text-${valueColor}` : "text-default"}
             tracking-wider`}
            >
                {terms.textstart} <Link
                className={"underline"}
                onClick={e => e.stopPropagation()}
                target={"_blank"}
                href={"https://www.hantecfinancial.com/assets/download/Finacial-Service-Guide_en.pdf"}
            >{terms.financial_service}</Link> , <Link
                    target={"_blank"}
                    className={"underline"}
                    onClick={e => e.stopPropagation()}
                    href={"https://www.hantecfinancial.com/assets/download/Product-Information-Statement_en.pdf"}
                >{terms.product_disclosure}</Link> {terms.and} <Link
                    target={"_blank"}
                    onClick={e => e.stopPropagation()}
                    className={"underline"}
                    href={"https://www.hantecfinancial.com/assets/download/T&C_en.pdf"}
                >{terms.terms_conditions}</Link> {terms.textEnd}
            </span>
        </div>
    );
};

export default Source;
