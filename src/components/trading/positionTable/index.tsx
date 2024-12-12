import React from "react";
import PositionRow from "@/components/trading/positionTable/positionRow";
import {IOpenedPositions} from "@/app/trading/trade-accounts/[slug]/page";
import {useTranslation} from "next-i18next";

interface IPositionsTable {
    positions: IOpenedPositions[];
}

const PositionsTable = ({positions}: IPositionsTable) => {

    const {t} = useTranslation("trading");
    const tableHeaders: any = t("single_account.positions.table_headers", {returnObjects: true});

    return (
        <div className="px-2 w-full mobile:hidden">
            <div className="tradingTableWrapper">
                <table className="w-full tradingTable2">
                    <thead>
                    <tr>
                        <th scope="col">{tableHeaders.ticket}</th>
                        <th scope="col">{tableHeaders.symbol}</th>
                        <th scope="col">{tableHeaders.action}</th>
                        <th scope="col">{tableHeaders["trade-date"]}</th>
                        <th scope="col">{tableHeaders["open-time"]}</th>
                        <th scope="col">{tableHeaders["open-price"]}</th>
                        <th scope="col">{tableHeaders["close-time"]}</th>
                        <th scope="col">{tableHeaders["close-price"]}</th>
                        <th scope="col">{tableHeaders.volume}</th>
                        <th scope="col" className="tablet:hidden">{tableHeaders.profit}</th>
                        <th scope="col" className="tablet:hidden">{tableHeaders.swaps}</th>
                        <th scope="col" className="tablet:hidden">{tableHeaders.commissions}</th>
                        <th className="tablet:hidden"></th>
                    </tr>
                    </thead>
                    {
                        positions.map((account, i) =>
                            <tbody key={i}>
                            <PositionRow account={account}/>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default PositionsTable;
