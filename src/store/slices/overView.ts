import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverView {
  liveAccounts: any;
  demoAccounts: any;
  allow: boolean;
}

const initialState: OverView = {
  liveAccounts: [],
  demoAccounts: [],
  allow: false,
};

const overViewSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setLiveAccounts(state, action: PayloadAction<any[]>) {
      state.liveAccounts = action.payload;
    },
    setDemoAccounts(state, action: PayloadAction<any[]>) {
      state.demoAccounts = action.payload;
    },
    setAllow(state, action: PayloadAction<any>) {
      state.allow = action.payload;
    },
  },
});

export const { setLiveAccounts, setDemoAccounts, setAllow } =
  overViewSlice.actions;

export default overViewSlice.reducer;
