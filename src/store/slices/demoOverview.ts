import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state based on the provided structure
interface DemoAccountProps {
  id: number;
  companyId: number;
  platformId: number;
  platformCatDesc: string;
  accountCode: string;
  status: string;
  availableMargin: number;
  availableBalance: number;
  balance: number;
  ccy: string;
  credit: number;
  leverage: number;
  netValue: number;
  accountType: number;
  platformTypeCode: string;
  openPL: number;
  tradeCount: number | null;
}

interface DemoAccountState {
  demoAccount: DemoAccountProps[];
}

const initialState: DemoAccountState = {
  demoAccount: [],
};

// Create the slice
const demoAccountSlice = createSlice({
  name: "demoAccount",
  initialState,
  reducers: {
    setDemoAccount: (state, action: PayloadAction<DemoAccountProps[]>) => {
      state.demoAccount = action.payload;
    },
    updateDemoBalance: (
      state,
      action: PayloadAction<{ id: number; balance: number }>
    ) => {
      const account = state.demoAccount.find(
        (acc) => acc.id === action.payload.id
      );
      if (account) {
        account.balance = action.payload.balance;
      }
    },
    resetDemoAccount: (state) => {
      state.demoAccount = [];
    },
  },
});

// Export actions and reducer
export const { setDemoAccount, updateDemoBalance, resetDemoAccount } =
  demoAccountSlice.actions;
  
export default demoAccountSlice.reducer;
