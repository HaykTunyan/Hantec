import React from "react";
import AccountInfoRow from "@/components/trading/mobileAccountsList/mobileAccountBadge/acourInfoRow";
import AccountCurrencyRow from "@/components/trading/mobileAccountsList/mobileAccountBadge/accountCurrencyRow";
import {useRouter} from "next/navigation";
import {TradeAccount} from "@/components/trading";
import Button from "@/components/button";
import {useTranslation} from "next-i18next";

interface IMobileOpenedClosedBadge {
    liveAccount: TradeAccount
}

const MobileOpenedClosedBadge = ({liveAccount}: IMobileOpenedClosedBadge) => {
    const router = useRouter();

    const {t} = useTranslation("trading");
    const tableHeaders: any = t("table_headers", {returnObjects: true});

    const handleRedirectToAccount = () => {
        router.push(`/trading/trade-accounts/${liveAccount.accountCode}?platformId=${liveAccount.platformId}`);
    };

    return (
        <div
            onClick={handleRedirectToAccount}
            className="w-full flex flex-col gap-6 px-4 py-6 bg-sidebar rounded-8">
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <span className="text-16 font-medium">#74500012</span>
                    <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="4" fill="#5D977B"/>
                        </svg>
                        <span className="text-14">{tableHeaders.state_values.live}</span>
                    </div>
                </div>
                <Button className={"btnSec btnDetails"} icon={"arrowRight"}/>
            </div>
            <div className="flex flex-col w-full">
                <AccountInfoRow name={tableHeaders.leverage} value={liveAccount.leverage}/>
                <AccountCurrencyRow value={liveAccount.ccy}/>
                <AccountInfoRow name={tableHeaders.balance} value={liveAccount.balance}/>
                <AccountInfoRow name={tableHeaders.open_pl} value={liveAccount.openPL}/>
                <AccountInfoRow name={tableHeaders.equity} value={liveAccount.netValue}/>
                <AccountInfoRow name={tableHeaders.free_margin} value={liveAccount.availableMargin} last={true}/>
            </div>
        </div>
    );
};

export default MobileOpenedClosedBadge;
