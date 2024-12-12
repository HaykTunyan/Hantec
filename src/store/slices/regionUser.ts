import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserRegion {
    id: number;
    userId: number | null;
    type: string;
    region: string;
  }
  
  interface UserRegionsState {
    regions: UserRegion[];
  }


const initialState: UserRegionsState = {
  regions: [],
};

// Create the slice
const userRegionsSlice = createSlice({
  name: 'userRegions',
  initialState,
  reducers: {
    setUserRegions(state, action: PayloadAction<UserRegion[]>) {
      state.regions = action.payload;
    },
    addUserRegion(state, action: PayloadAction<UserRegion>) {
      state.regions.push(action.payload);
    },
    updateUserRegion(state, action: PayloadAction<UserRegion>) {
      const index = state.regions.findIndex(region => region.id === action.payload.id);
      if (index !== -1) {
        state.regions[index] = action.payload;
      }
    },
    removeUserRegion(state, action: PayloadAction<number>) {
      state.regions = state.regions.filter(region => region.id !== action.payload);
    },
  },
});

export const { setUserRegions, addUserRegion, updateUserRegion, removeUserRegion } = userRegionsSlice.actions;
export default userRegionsSlice.reducer;
