"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Layout from "@/app/dashboard/layout";
import TradingAccountComp from "@/components/trading/tradingAccout";
import { getUserTradingAccount } from "@/api/profile/getUserTradingAccount";
import { getAssetsData } from "@/services";
import { TradeAccount } from "@/components/trading";
import { useDemo } from "@/context/DemoContext";
import LoadingScreen from "@/components/loadingScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface ITradingAccount {
  balance: number;
  depositTotal: number;
  closePlTotal: number;
  equity: number;
  withdrawalTotal: number;
  openPl: number;
  margin: number;
  marginLevel: number;
  marginFree: number;
  profitability: number;
  amountWin: number;
  amountLoss: number;
  averageOrderDurationInSec: number;
  pointBestTrade: number;
  pointWorstTrade: number;
  tradeBuyWin: number;
  tradeSellWin: number;
  tradeTotal: number;
}

export interface IOpenedPositions {
  ticket: number;
  symbol: string;
  tradeDate: string;
  openTime: number;
  openPrice: number;
  volume: number;
  profit: number;
  swaps: number;
  commission: number;
  cmd: number;
}

export interface IClosedPositions {
  ticket: number;
  symbol: string;
  tradeDate: string;
  openTime: number;
  closeTime?: number;
  openPrice: number;
  closePrice?: number;
  volume: number;
  profit: number;
  swaps: number;
  commission: number;
  cmd: number;
}

export interface IAsset {
  openAmtBuyPercent: number;
  openAmtSellPercent: number;
  openAmtTotalPercent: number;
  productGroup: string;
  symbol: string;
}

const TradeAccountComp = () => {
  const { demo } = useDemo();
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const platformId = searchParams.get("platformId")!;
  const [tradingAccount, setTradingAccount] = useState<ITradingAccount>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [demoAccounts, setDemoAccounts] = useState<string[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [tradingAccountIds, setTradingAccountIds] = useState<any>();
  const [tradingDemoAccountIds, setTradingDemoAccountIds] = useState<any>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const overView = useSelector((state: RootState) => state.overView);

  useEffect(() => {
    if (!overView) {
      return;
    }

    const accountCodes = overView.liveAccounts.map(
      (i: TradeAccount) => i.accountCode
    );
    const demoAccountCodes = overView.demoAccounts.map(
      (i: TradeAccount) => i.accountCode
    );
    const accountIds = overView.liveAccounts.reduce(
      (acc: any, i: TradeAccount) => {
        acc[i.accountCode] = i.id;
        return acc;
      },
      {}
    );

    const demoAccountIds = overView.demoAccounts.reduce(
      (acc: any, i: TradeAccount) => {
        acc[i.accountCode] = i.id;
        return acc;
      },
      {}
    );

    setTradingAccountIds(accountIds);
    setTradingDemoAccountIds(demoAccountIds);
    setAccounts([...accountCodes]);
    setDemoAccounts([...demoAccountCodes]);

    setIsProcessing(true); // Start processing

    let isFirstRequestDone = false;
    let isThirdRequestDone = false;

    getUserTradingAccount(slug as string, Number(platformId))
      .then((res) => {
        if (res) {
          setTradingAccount({ ...res });
        }
      })
      .finally(() => {
        isFirstRequestDone = true;
        if (isFirstRequestDone && isThirdRequestDone) {
          setIsProcessing(false);
        }
      });

    getAssetsData(platformId, slug as string, 0)
      .then((res) => {
        //@ts-ignore
        if (res && res.data) {
          //@ts-ignore
          setAssets(res.data);
        }
      })
      .finally(() => {
        isThirdRequestDone = true;
        if (isFirstRequestDone && isThirdRequestDone) {
          setIsProcessing(false);
        }
      });
  }, [overView]);

  return (
    <Layout>
      <LoadingScreen isLoading={isProcessing} />
      {tradingAccount && tradingAccountIds && (
        <TradingAccountComp
          tradingAccountId={
            demo
              ? tradingDemoAccountIds[slug as string]
              : tradingAccountIds[slug as string]
          }
          assets={assets}
          tradingAccount={tradingAccount}
          accountNumber={slug as string}
          platformId={platformId as string}
          accounts={demo ? demoAccounts : accounts}
        />
      )}
    </Layout>
  );
};

export default TradeAccountComp;
