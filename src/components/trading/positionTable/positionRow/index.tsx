import React from "react";
import {IClosedPositions} from "@/app/trading/trade-accounts/[slug]/page";
import {formatTimestamp} from "@/hooks/formatTimestamp";
import {roundToTwoDecimel} from "@/hooks/roundToTwoDecimel";

interface IPositionRow {
    account: IClosedPositions;
}

const PositionRow = ({account}: IPositionRow) => {
    const {
        ticket,
        symbol,
        tradeDate,
        openTime,
        closeTime,
        openPrice,
        closePrice,
        volume,
        profit,
        swaps,
        commission,
        cmd
    } = account;

    return (
        <tr
            className="cursor-pointer"
        >
            <td>{ticket}</td>
            <td>
                <div className="flex items-center gap-1">
                    {/*<img src="/icons/flag-usd.svg" alt=""/>*/}
                    {/*<span>USD</span>*/}
                    <span>{symbol}</span>
                </div>
            </td>
            <td>
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
                    <span>{cmd !== 0 ? "Sell" : "Buy"}</span>
                </div>
            </td>
            <td>{tradeDate}</td>
            <td>{formatTimestamp(openTime)}</td>
            <td>{roundToTwoDecimel(openPrice)}</td>
            {
                closeTime && <td>{formatTimestamp(closeTime)}</td>
            }
            {
                closePrice && <td>{roundToTwoDecimel(closePrice)}</td>
            }
            <td>{roundToTwoDecimel(volume)}</td>
            <td className="tablet:hidden">${roundToTwoDecimel(profit)}</td>
            <td className="tablet:hidden">${roundToTwoDecimel(swaps)}</td>
            <td className="tablet:hidden">${roundToTwoDecimel(commission)}</td>
        </tr>
    );
};

export default PositionRow;
