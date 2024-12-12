import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountSummary {
    login: string;
    currency: string;
    balance: number;
    equity: number;
    margin: number;
    marginFree: number;
    marginLevel: number;
    openPl: number;
    closePlToday: number;
    profitability: number;
    accountSummaryToCcyMap: { [key: string]: AccountSummary };
  }

  const initialState: AccountSummary = {
    login: "",
    currency: "",
    balance: 0,
    equity: 0,
    margin: 0,
    marginFree: 0,
    marginLevel: 0,
    openPl: 0,
    closePlToday: 0,
    profitability: 0,
    accountSummaryToCcyMap: {},
  };

const accountSummarySlice = createSlice({
  name: "accountSummary",
  initialState,
  reducers: {
    setAccountSummary(state, action: PayloadAction<AccountSummary>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAccountSummary } = accountSummarySlice.actions;

export default accountSummarySlice.reducer;
