import React from "react";
import AccountRow from "@/components/trading/accountsList/accountRow";
import {TradeAccount} from "@/components/trading";
import {useTranslation} from "next-i18next";

interface IAccountList {
    accounts: TradeAccount[];
}

const AccountsList = ({accounts}: IAccountList) => {
    const {t} = useTranslation("trading");
    const tableHeaders: any = t("table_headers", {returnObjects: true});

    if (accounts.length === 0) {
        return;
    }

    return (
        <div className="px-2 w-full mobile:hidden">
            <table className="w-full tradingTable">
                <thead>
                <tr>
                    <th scope="col">{tableHeaders.account_number}</th>
                    <th scope="col">{tableHeaders.state}</th>
                    <th scope="col">{tableHeaders.leverage}</th>
                    <th scope="col">{tableHeaders.currency}</th>
                    <th scope="col">{tableHeaders.balance}</th>
                    <th scope="col" className="tablet:hidden">{tableHeaders.open_pl}</th>
                    <th scope="col" className="tablet:hidden">{tableHeaders.equity}</th>
                    <th scope="col" className="tablet:hidden">{tableHeaders.free_margin}</th>
                    <th className="tablet:hidden"></th>
                </tr>
                </thead>
                {
                    accounts.length > 0 &&
                    accounts.map((account, i) =>
                        <tbody key={i}>
                        <AccountRow account={account}/>
                        </tbody>
                    )
                }
            </table>
        </div>
    );
};

export default AccountsList;
