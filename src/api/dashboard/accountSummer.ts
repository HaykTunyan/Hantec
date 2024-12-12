import { requestAPI } from "@/services/globalAxios";

interface AccountSummary {
  currency: string;
  balance: number;
  equity: number;
  margin: number;
  marginFree: number;
  marginLevel: number;
  openPl: number;
  closePlToday: number;
  profitability: number;
}

interface AccountSummaryResponse {
  status: string;
  msg: string | null;
  rtnCode: string | null;
  data: {
    accountSummaryToCcyMap: Record<string, AccountSummary>;
  };
}

interface RequestParams {
  platformIdListInStr: string;
  accountCodeListInStr: string;
}

export const getGetSummary = async ({ platformIdListInStr, accountCodeListInStr }: RequestParams) => {
  try {
    const response = await requestAPI.get<AccountSummaryResponse>(
      `/api/cs/report/account-summary`,
      {
        params: {
          platformIdListInStr,
          accountCodeListInStr,
        },
      }
    );
    // @ts-ignore
    if (response.status !== "200") {
      throw new Error(`Server responded with a non-2xx status code.`);
    }

    const { accountSummaryToCcyMap } = response.data.data;
    return accountSummaryToCcyMap;
  } catch (error) {
    return null;
  }
};
