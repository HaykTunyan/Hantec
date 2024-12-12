import React from "react";

interface ITradeDistributionRow {
    color: string,
    percent: number,
    currency: string,
}

const TradeDistributionRow = ({color, percent, currency}: ITradeDistributionRow) => {
    return (
        <div className="flex items-center justify-between py-1.5 border-b border-info-badge">
            <div className='flex items-center gap-0.5'>
                <svg
                    className="w-4 h-4 object-contain"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" fill={`${color}`}/>
                </svg>
                <span className="text-14 tracking-wider text-default">{percent}%</span>
            </div>
            <div className="flex items-center gap-0.5">
                <div className="flex items-center gap-0.5 pl-[3px]">
                    {/*<img*/}
                    {/*    className="w-4 h-4 object-contain"*/}
                    {/*    src={`/icons/currency/${currency1}.png`}*/}
                    {/*    alt=""*/}
                    {/*/>*/}
                    <span className="text-11 text-default uppercase">{currency}</span>
                </div>
                {/*{*/}
                {/*    currency2 && <div className="flex items-center gap-0.5">*/}
                {/*        <svg*/}
                {/*            className="w-2.5 h-2.5 object-contain"*/}
                {/*            width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*            <path fillRule="evenodd" clipRule="evenodd"*/}
                {/*                  d="M2.2334 8.58594L6.81673 1.08594L7.35003 1.41184L2.7667 8.91184L2.2334 8.58594Z"*/}
                {/*                  fill="#2B2A28"/>*/}
                {/*        </svg>*/}
                {/*        <div className="flex items-center gap-0.5 pl-[3px]">*/}
                {/*            <img*/}
                {/*                className="w-4 h-4 object-contain"*/}
                {/*                src={`/icons/currency/${currency2}.png`}*/}
                {/*                alt=""*/}
                {/*            />*/}
                {/*            <span className="text-11 text-default uppercase">{currency2}</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </div>
    );
};

export default TradeDistributionRow;
