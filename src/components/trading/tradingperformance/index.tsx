import React from "react";
import InfoBadge from "@/components/trading/tradingperformance/infoBadge";
import AccountInfoRow from "@/components/trading/mobileAccountsList/mobileAccountBadge/acourInfoRow";
import {useSeparateDecimal} from "@/hooks/separateDecimal";
import {ITradingAccount} from "@/app/trading/trade-accounts/[slug]/page";
import {secondsToDays} from "@/hooks/secondsToDays";
import {useTranslation} from "next-i18next";

interface ITradingAccountInfo {
    tradingAccount: ITradingAccount;
}

const TradingAccountInfo = ({tradingAccount}: ITradingAccountInfo) => {
    const {
        balance,
        depositTotal,
        closePlTotal,
        equity,
        withdrawalTotal,
        openPl,
        margin,
        marginLevel,
        marginFree,
        profitability,
        amountWin,
        amountLoss,
        averageOrderDurationInSec,
        pointBestTrade,
        pointWorstTrade,
        tradeBuyWin,
        tradeSellWin,
        tradeTotal
    } = tradingAccount;

    const marginInteger = useSeparateDecimal(margin)?.integerPart;
    const marginDecimal = useSeparateDecimal(margin)?.decimalPart;
    const marginFreeInteger = useSeparateDecimal(marginFree)?.integerPart;
    const marginFreeDecimal = useSeparateDecimal(marginFree)?.decimalPart;

    const marginLevelInteger = useSeparateDecimal(marginLevel)?.integerPart;

    const {t} = useTranslation("trading");
    const accountBalance: any = t("single_account.account_balance", {returnObjects: true});
    const trades: any = t("single_account.account_balance.trades", {returnObjects: true});

    return (
        <div className="flex tablet:flex-col gap-1 tablet:gap-8 px-2 w-full h-full items-start">
            <div className="flex flex-col gap-1 w-full h-full">
                <div className="mainGrid">
                    <div className="gridRow">
                        <InfoBadge
                            title={accountBalance["total-balance"]}
                            value={balance}
                            backColor={"#FEDB90"}
                            valueColor={"#365848"}
                            titleColor={"#686765"}
                        />
                        <InfoBadge
                            title={accountBalance["total-deposited"]}
                            value={depositTotal}
                            backColor={"#F1EEEA"}
                            valueColor={"#2B2A28"}
                            titleColor={"#686765"}
                        />
                        <InfoBadge
                            title={accountBalance["closed_pl"]}
                            value={closePlTotal}
                            backColor={"#F1EEEA"}
                            valueColor={"#2B2A28"}
                            titleColor={"#686765"}
                        />
                    </div>
                    <div className="gridRow">
                        <InfoBadge
                            title={accountBalance["my_equity"]}
                            value={equity}
                            backColor={"#EBEEE2"}
                            valueColor={"#365848"}
                            titleColor={"#686765"}
                        />
                        <InfoBadge
                            title={accountBalance["total-withdrawn"]}
                            value={withdrawalTotal}
                            backColor={"#F1EEEA"}
                            valueColor={"#2B2A28"}
                            titleColor={"#686765"}
                        />
                        <InfoBadge
                            title={accountBalance["open_pl"]}
                            value={openPl}
                            backColor={"#F1EEEA"}
                            valueColor={"#2B2A28"}
                            titleColor={"#686765"}
                        />
                    </div>
                </div>
                <div className="flex items-center mobile:h-[140px] gap-1 bg-main py-[23px] px-6 rounded-[8px]">
                    <div
                        className="flex flex-col mobile:justify-between gap-[43px] mobile:h-full mobile:gap-0 pr-6 mobile:pr-3 border-r border-info-badge w-full">
                        <span className="text-14 text-grey-seccondary">{accountBalance.margin}</span>
                        <div className="flex items-end">
                            <span
                                className="text-32-t32-g text-default"
                                style={{lineHeight: "32px"}}
                            >${margin ? marginInteger : "0"}</span>
                            {
                                margin ? <span
                                        className="text-14-g"
                                        style={{marginBottom: "3px"}}
                                    >{marginDecimal}</span>
                                    : <span
                                        className="text-14-g"
                                        style={{marginBottom: "3px"}}
                                    ></span>
                            }
                        </div>
                    </div>
                    <div
                        className="flex flex-col mobile:justify-between mobile:h-full gap-[43px] mobile:gap-0 px-6 mobile:px-3 border-r border-info-badge w-full">
                        <span className="text-14 text-grey-seccondary">{accountBalance["free-margin"]}</span>
                        <div className="flex items-end">
                            <span
                                className="text-32-t32-g text-default"
                                style={{lineHeight: "32px"}}
                            >${marginFree ? marginFreeInteger : "0"}</span>
                            {
                                marginFree ? <span
                                        className="text-14-g"
                                        style={{marginBottom: "3px"}}
                                    >{marginFreeDecimal}</span>
                                    : <span
                                        className="text-14-g"
                                        style={{marginBottom: "3px"}}
                                    ></span>
                            }

                        </div>
                    </div>
                    <div
                        className="flex flex-col mobile:justify-between gap-[43px] mobile:gap-0 mobile:h-full pl-6 mobile:pl-3 w-full">
                        <span className="text-14 text-grey-seccondary">{accountBalance["margin-level"]}</span>
                        <div className="flex items-end">
                            {
                                marginLevel ? <span
                                        className="text-32-t32-g text-default"
                                        style={{lineHeight: "32px"}}
                                    >1:{marginLevelInteger}</span>
                                    : <span
                                        className="text-32-t32-g text-default"
                                        style={{lineHeight: "32px"}}
                                    >0</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="w-[339px] tablet:w-full flex-0-0-auto-all h-full p-6 pb-[17px] rounded-[8px] bg-main flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-16 font-medium text-grey-seccondary">{trades.total_trades}</span>
                    <span className="text-24">{tradeTotal ? tradeTotal : 0}</span>
                </div>
                <div className="flex flex-col">
                    <AccountInfoRow padding={"12px 0"} name={trades.profitability} profitability={true}
                                    value={profitability}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["average-win"]} value={amountWin}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["average-loss"]} value={amountLoss}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["average-order-duration"]} days={true}
                                    value={secondsToDays(averageOrderDurationInSec)}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["profitable-long-trades"]} value={tradeBuyWin}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["profitable-short-trades"]} value={tradeSellWin}/>
                    <AccountInfoRow padding={"12px 0"} name={trades["best-trade-usd"]} value={pointBestTrade}/>
                    <AccountInfoRow
                        padding={"12px 0"}
                        name={trades["worst-trade-usd"]}
                        value={pointWorstTrade}
                        last={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default TradingAccountInfo;
