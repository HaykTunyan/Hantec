import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  id: number;
  userId: number | null;
  status: string;
  walletName: string;
  walletType: string;
  walletAddress: string;
  crtTime: string | null;
}

const initialState: WalletState = {
  id: 0,
  userId: null,
  status: '',
  walletName: '',
  walletType: '',
  walletAddress: '',
  crtTime: null,
};

// If you want dynamic initialization (e.g., from an API or local storage)
export const initializeWalletState = (dynamicState: Partial<WalletState>): WalletState => ({
  ...initialState,
  ...dynamicState,  // Override the default values with dynamic values
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletState>) => {
      return { ...state, ...action.payload };
    },
    updateWalletName: (state, action: PayloadAction<string>) => {
      state.walletName = action.payload;
    },
    updateWalletType: (state, action: PayloadAction<string>) => {
      state.walletType = action.payload;
    },
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    resetWallet: (state) => {
      return initialState;
    },
  },
});

export const { setWallet, updateWalletName, updateWalletType, updateWalletAddress, resetWallet } = walletSlice.actions;

export default walletSlice.reducer;
