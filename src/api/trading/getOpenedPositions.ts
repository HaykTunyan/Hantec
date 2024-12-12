import {requestAPI} from "@/services/globalAxios";
import {IOpenedPositions} from "@/app/trading/trade-accounts/[slug]/page";

export const getOpenedPositions = async (accountNumber: string, platformId: number, offset: number, limit: number) => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `/api/cs/report/openPositions?platformId=${platformId}&accountCode=${accountNumber}&ddPageIdx=${offset}&ddPageRecSize=${limit}`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            count: data.data.ddRecTotal,
            openedPositions: data.data.resultSet.map((item: IOpenedPositions) => {
                return {
                    ticket: item.ticket,
                    symbol: item.symbol,
                    tradeDate: item.tradeDate,
                    openTime: item.openTime,
                    openPrice: item.openPrice,
                    volume: item.volume,
                    profit: item.profit,
                    swaps: item.swaps,
                    commission: item.commission,
                    cmd: item.cmd
                };
            })
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
