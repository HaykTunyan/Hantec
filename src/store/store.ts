"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import infoReducer from "./slices/infoSlice";
import accountSummaryReduce from "./slices/accountSummarySlice";
import accountsReducer from "./slices/userOverview";
import demoAccountReducer from "./slices/demoOverview";
import configWithdrawRedicer from "./slices/configWithdraw";
import applicationReducer from "./slices/applicationSlice";
import verificationReducer from "./slices/verificationSlice";
import walletReducer from "./slices/walletSlice";
import userRegionsReducer from "./slices/regionUser";
import overView from "@/store/slices/overView";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    info: infoReducer,
    accountSummary: accountSummaryReduce,
    accounts: accountsReducer,
    demoAccount: demoAccountReducer,
    configWithdraw: configWithdrawRedicer,
    application: applicationReducer,
    verification: verificationReducer,
    wallet: walletReducer,
    userRegions: userRegionsReducer,
    overView: overView,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
