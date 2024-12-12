import React from "react";
import Button from "@/components/button";
import {useRouter} from "next/navigation";
import {TradeAccount} from "@/components/trading";
import {useDemo} from "@/context/DemoContext";
import {useTranslation} from "next-i18next";

interface IAccountRow {
    account: TradeAccount
}

const AccountRow = ({account}: IAccountRow) => {
    const router = useRouter();
    const {demo} = useDemo();

    const {t} = useTranslation("trading");

    const handleRedirectToAccount = () => {
        router.push(`/trading/trade-accounts/${account.accountCode}?platformId=${account.platformId}`);
    };

    return (
        <tr
            onClick={handleRedirectToAccount}
            className='cursor-pointer'
        >
            <td>#{account.accountCode}</td>
            <td>
                <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="4" fill="#5D977B"/>
                    </svg>
                    <span>{demo ? t("table_headers.state_values.demo") : t("table_headers.state_values.live")}</span>
                </div>

            </td>
            <td>1:{account.leverage}</td>
            <td>
                <div className="flex items-center gap-1">
                    <img src={`https://hantecfinancial.com/assets/download/hantec-icons/${account.ccy}.svg`} alt=""/>
                    <span>{account.ccy}</span>
                </div>
            </td>
            <td>USD {account.balance}</td>
            <td className="tablet:hidden">${account.openPL}</td>
            <td className="tablet:hidden">${account.netValue}</td>
            <td className="tablet:hidden">${account.availableMargin}</td>
            <td className="tablet:hidden">
                <div
                    className={`flex items-center justify-end pr-2`}>
                    <Button btnName={t("details_button")} className={"btnSec btnDetails"}/>
                </div>
            </td>
        </tr>
    );
};

export default AccountRow;
