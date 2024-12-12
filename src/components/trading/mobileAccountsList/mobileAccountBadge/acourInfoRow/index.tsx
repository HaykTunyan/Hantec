import React from "react";
import {useTranslation} from "next-i18next";

interface IAccountInfoRow {
    name: string,
    value: number | string,
    last?: boolean,
    padding?: string,
    profitability?: boolean,
    days?: boolean
}

const AccountInfoRow = ({name, value, last, padding, profitability, days}: IAccountInfoRow) => {
    const {t} = useTranslation("trading");
    const dayInfo: any = t("single_account.positions.day_tabs", {returnObjects: true});

    return (
        <div
            className={`flex w-full items-center justify-between pt-3 pb-4 ${last ? "border-none" : "border-b"} grey-border-dark`}
            style={{padding: `${padding}`}}
        >
            <span className="text-14 text-grey-seccondary">{name}</span>
            {
                value ? <span className="text-14 text-default">
                        {name === "Leverage" ? "1:" : ""}
                        {name === "Profit" || name === "Swaps" ? "$" : ""}
                        {profitability && "%"}
                        {value}
                        {days && ` ${dayInfo.days_count}`}
                </span>
                    : <span className="text-14 text-default">0{days && ` ${dayInfo.days_count}`}</span>
            }
        </div>
    );
};

export default AccountInfoRow;
