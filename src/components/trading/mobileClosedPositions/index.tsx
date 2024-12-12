import React from "react";
import MobileAccountBadge from "@/components/trading/mobileClosedPositions/mobileAccountBadge";
import {IOpenedPositions} from "@/app/trading/trade-accounts/[slug]/page";

interface IPositionsTable {
    positions: IOpenedPositions[]
}

const MobileAccountsListClosed = ({positions}: IPositionsTable) => {
    return (
        <div className="hidden w-full mobile:flex flex-col gap-2 px-2 pb-6">
            {
                positions.map((position, index) =>
                    <MobileAccountBadge key={index} account={position} />
                )
            }
        </div>
    );
};

export default MobileAccountsListClosed;
