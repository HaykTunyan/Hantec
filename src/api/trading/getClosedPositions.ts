import {requestAPI} from "@/services/globalAxios";
import {IClosedPositions} from "@/app/trading/trade-accounts/[slug]/page";

export const getClosedPositions = async (
    accountNumber: string,
    platformId: number,
    offset: number,
    limit: number,
    fromDate: string,
    toDate: string
) => {
    const statusError = 200;
    try {
        const response = await requestAPI.get(
            `/api/cs/report/closePositions?platformId=${platformId}&accountCode=${accountNumber}&ddPageIdx=${offset}&ddPageRecSize=${limit}&toDate=${toDate}&fromDate=${fromDate}`,
        );

        if (response.status !== statusError) {
            throw new Error("Server responded with a non-2xx status code.");
        }

        const data = response.data;

        return {
            count: data.data.ddRecTotal,
            closedPositions: data.data.resultSet.map((item: IClosedPositions) => {
                return {
                    ticket: item.ticket,
                    symbol: item.symbol,
                    tradeDate: item.tradeDate,
                    openTime: item.openTime,
                    closeTime: item.closeTime,
                    openPrice: item.openPrice,
                    closePrice: item.closePrice,
                    volume: item.volume,
                    profit: item.profit,
                    swaps: item.swaps,
                    commission: item.commission,
                };
            })
        };
    } catch (error) {
        new Error(`Server responded with a non-2xx status code: ${error}`);
        return null;
    }
};
