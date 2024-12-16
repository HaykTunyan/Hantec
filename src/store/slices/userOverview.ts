// store/slices/accountsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for an account
interface Account {
  id: number | null;
  companyId: number | null;
  platformId: number | null;
  platformCatDesc: string;
  accountCode: string;
  status: string;
  availableMargin: number | null;
  availableBalance: number | null;
  balance: number | null;
  ccy: string;
  credit: number | null;
  leverage: number | null;
  netValue: number | null;
  accountType: number | null;
  platformTypeCode: string;
  openPL: number | null;
  tradeCount: number | null;
}

// Define the type for the state
interface AccountsState {
  accounts: Account[];
}

// Initial state
const initialState: AccountsState = {
  accounts: [],
};

// Create the slice
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
    addAccount(state, action: PayloadAction<Account>) {
      state.accounts.push(action.payload);
    },
    updateAccount(state, action: PayloadAction<Account>) {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    removeAccount(state, action: PayloadAction<number>) {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
  },
});

// Export actions and reducer
export const { setAccounts, addAccount, updateAccount, removeAccount } =
  accountsSlice.actions;

export default accountsSlice.reducer;
