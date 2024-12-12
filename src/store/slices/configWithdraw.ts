import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigWithdrawItem {
  companyId: number | null;
  parentId: number | null;
  paymentMethod: string;
  receiveCcyList: any;
  status: string;
}

type ConfigWithdrawState = ConfigWithdrawItem[];

const initialState: ConfigWithdrawState = [];

const configWithdrawSlice = createSlice({
  name: "configWithdraw",
  initialState,
  reducers: {
    setConfigWithdraw(state, action: PayloadAction<ConfigWithdrawState>) {
      return [...action.payload];
    },
  },
});

export const { setConfigWithdraw } = configWithdrawSlice.actions;

export default configWithdrawSlice.reducer;
