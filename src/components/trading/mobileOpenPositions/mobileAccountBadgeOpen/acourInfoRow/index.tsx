import React from "react";

interface IAccountInfoRow {
    name: string,
    value: string,
    last?: boolean,
    padding?: string,
}

const AccountInfoRow = ({name, value, last, padding}: IAccountInfoRow) => {
    return (
        <div
            className={`flex w-full items-center justify-between pt-3 pb-4 ${last ? "border-none" : "border-b"} grey-border-dark`}
            style={{padding: `${padding}`}}
        >
            <span className="text-14 text-grey-seccondary">{name}</span>
            <span className="text-14 text-default">{value}</span>
        </div>
    );
};

export default AccountInfoRow;
