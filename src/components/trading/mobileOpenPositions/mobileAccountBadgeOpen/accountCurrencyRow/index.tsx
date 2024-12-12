import React from "react";

interface IAccountCurrencyRow {
    value: string
}

const AccountCurrencyRow = ({value}: IAccountCurrencyRow) => {
    return (
        <div className="flex w-full items-center justify-between pt-3 pb-4 border-b grey-border-dark">
            <span className="text-14 text-grey-seccondary">Currency</span>
            <div className='flex items-center gap-1'>
                <img src="/icons/flag-usd.svg" alt=""/>
                <span className="text-14 text-default">{value}</span>
            </div>
        </div>
    );
};

export default AccountCurrencyRow;
