import {requestAPI} from "@/services/globalAxios";

export const getUserTradingAccount = async (accountNumber: string, platformId: number) => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `/api/cs/report/account-detail?accountCode=${accountNumber}&platformId=${platformId}`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            balance: data.data.balance,
            depositTotal: data.data.depositTotal,
            closePlTotal: data.data.closePlTotal,
            equity: data.data.equity,
            withdrawalTotal: data.data.withdrawalTotal,
            openPl: data.data.openPl,
            margin: data.data.margin,
            marginLevel: data.data.marginLevel,
            marginFree: data.data.marginFree,
            profitability: data.data.profitability,
            amountWin: data.data.amountWin,
            amountLoss: data.data.amountLoss,
            averageOrderDurationInSec: data.data.averageOrderDurationInSec,
            pointBestTrade: data.data.pointBestTrade,
            pointWorstTrade: data.data.pointWorstTrade,
            tradeBuyWin: data.data.tradeBuyWin,
            tradeSellWin: data.data.tradeSellWin,
            tradeTotal: data.data.tradeTotal,
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
