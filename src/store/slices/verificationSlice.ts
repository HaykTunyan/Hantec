import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
interface VerificationState {
  isVerified: boolean;
}

// Set the initial state
const initialState: VerificationState = {
  isVerified: false, // Default to not verified
};

// Create the verification slice
const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    verify(state) {
      state.isVerified = true; // Set verified to true
    },
    unverify(state) {
      state.isVerified = false; // Set verified to false
    },
  },
});

// Export actions
export const { verify, unverify } = verificationSlice.actions;

// Export the reducer
export default verificationSlice.reducer;
