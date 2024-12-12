import React from "react";
import {IOpenedPositions} from "@/app/trading/trade-accounts/[slug]/page";
import MobileAccountBadgeOpen from "@/components/trading/mobileOpenPositions/mobileAccountBadgeOpen";

interface IPositionsTable {
    positions: IOpenedPositions[]
}

const MobileAccountsListOpen = ({positions}: IPositionsTable) => {
    return (
        <div className="hidden w-full mobile:flex flex-col gap-2 px-2 pb-6">
            {
                positions.map((position, index) =>
                    <MobileAccountBadgeOpen key={index} account={position} />
                )
            }
        </div>
    );
};

export default MobileAccountsListOpen;
