import React from "react";
import MobileAccountBadge from "@/components/trading/mobileAccountsList/mobileAccountBadge";
import {TradeAccount} from "@/components/trading";

interface IAccountList {
    accounts: TradeAccount[];
}

const MobileAccountsList = ({accounts}: IAccountList) => {
    if (accounts.length === 0) {
        return;
    }

    return (
        <div className="hidden w-full mobile:flex flex-col gap-2 px-2 pb-6 tablet:pb-[136px]">
            {
                accounts.map((account, i) =>
                    <MobileAccountBadge key={i} liveAccount={account}/>
                )
            }
        </div>
    );
};

export default MobileAccountsList;
