import React from "react";

interface IAccountCurrencyRow {
    value: string;
}

const AccountTodayPLRow = ({value}: IAccountCurrencyRow) => {
    return (
        <div className="flex w-full items-center justify-between pt-3 pb-4 border-b grey-border-dark">
            <span className="text-14 text-grey-seccondary">Today P/L</span>
            <div className="flex items-center justify-center gap-1 px-2 py-1.5 w-20 bg-hover-sidebar rounded">
                <svg
                    className="w-3 h-3 object-contain flex-shrink-0 flex-grow-0"
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" fill="#5D977B"/>
                </svg>
                <span className="text-11 text-green-extra-dark">$32.5112</span>
            </div>
        </div>
    );
};

export default AccountTodayPLRow;
