// slices/infoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfoState {
  lastModTime: number | null;
  lastModUserName: string;
  id: number | null;
  companyId: number | null;
  type: string;
  name: string;
  loginId: string;
  status: string;
  email: string;
  phone: string;
  address: string | null;
  crtTime: number | null;
}

const initialState: InfoState = {
  lastModTime: null,
  lastModUserName: "",
  id: null,
  companyId: null,
  type: "",
  name: "",
  loginId: "",
  status: "",
  email: "",
  phone: "",
  address: null,
  crtTime: null,
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<InfoState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setInfo } = infoSlice.actions;

export default infoSlice.reducer;
export { initialState };
