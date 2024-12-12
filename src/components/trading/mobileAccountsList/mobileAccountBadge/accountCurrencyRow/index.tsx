import React from "react";
import {useTranslation} from "next-i18next";

interface IAccountCurrencyRow {
    value: string
}

const AccountCurrencyRow = ({value}: IAccountCurrencyRow) => {
    const {t} = useTranslation("trading");
    const tableHeaders: any = t("single_account.positions.table_headers", {returnObjects: true});

    return (
        <div className="flex w-full items-center justify-between pt-3 pb-4 border-b grey-border-dark">
            <span className="text-14 text-grey-seccondary">{tableHeaders.symbol}</span>
            <div className='flex items-center gap-1'>
                <img src={`https://hantecfinancial.com/assets/download/hantec-icons/${value}.svg`} alt=""/>
                <span className="text-14 text-default">{value}</span>
            </div>
        </div>
    );
};

export default AccountCurrencyRow;
