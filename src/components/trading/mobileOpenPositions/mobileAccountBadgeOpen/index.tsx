import React from "react";
import AccountInfoRow from "@/components/trading/mobileAccountsList/mobileAccountBadge/acourInfoRow";
import AccountCurrencyRow from "@/components/trading/mobileAccountsList/mobileAccountBadge/accountCurrencyRow";
import {IOpenedPositions} from "@/app/trading/trade-accounts/[slug]/page";
import {formatTimestamp} from "@/hooks/formatTimestamp";
import {roundToTwoDecimel} from "@/hooks/roundToTwoDecimel";
import {useTranslation} from "next-i18next";

interface IMobileAccountBadge {
    account: IOpenedPositions;
}

const MobileAccountBadgeOpen = ({account}: IMobileAccountBadge) => {
    const {t} = useTranslation("trading");
    const tableHeaders: any = t("single_account.positions.table_headers", {returnObjects: true});
    const charts: any = t("single_account.assets.chart", {returnObjects: true});

    const {
        ticket,
        symbol,
        tradeDate,
        openTime,
        openPrice,
        volume,
        profit,
        swaps,
        commission,
        cmd
    } = account;

    return (
        <div
            className="w-full flex flex-col gap-6 px-4 py-6 bg-sidebar rounded-8">
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <span className="text-16 font-medium">{ticket}</span>
                    <div className="flex items-center gap-1">
                        {
                            cmd !== 0 ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="4" fill="#FFB109"/>
                                </svg>
                                : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="4" fill="#5D977B"/>
                                </svg>
                        }
                        <span>{cmd !== 0 ? charts.sell : charts.buy}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <AccountCurrencyRow value={symbol}/>
                <AccountInfoRow name={tableHeaders["trade-date"]} value={tradeDate}/>
                <AccountInfoRow name={tableHeaders["open-time"]} value={formatTimestamp(openTime)}/>
                <AccountInfoRow name={tableHeaders["open-price"]} value={roundToTwoDecimel(openPrice)}/>
                <AccountInfoRow name={tableHeaders.volume} value={roundToTwoDecimel(volume)}/>
                <AccountInfoRow name={tableHeaders.profit} value={roundToTwoDecimel(profit)}/>
                <AccountInfoRow name={tableHeaders.swaps} value={roundToTwoDecimel(swaps)}/>
                <AccountInfoRow name={tableHeaders.commissions} value={roundToTwoDecimel(commission)} last={true}/>
                {/*<AccountTodayPLRow value={"32.5112"}/>*/}
                {/*<AccountInfoRow name={"Open P/L"} value={"$4,023.10"}/>*/}
                {/*<AccountInfoRow name={"Equity"} value={"$122,023.10"}/>*/}
                {/*<AccountInfoRow name={"Free Margin"} value={"$4,023.10"} last={true}/>*/}
            </div>
        </div>
    );
};

export default MobileAccountBadgeOpen;
