import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  accounts: [],
  getWalletDetaillsLoading: true,
  isUnlocked: false,
};

export const temStorePassword = createAsyncThunk();

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    getWalletDetails: (state, { payload }) => {
      let value = localStorage.getItem("userAccounts");

      if (value === null) {
        state.accounts = null;
        state.getWalletDetaillsLoading = false;
      } else {
        value = JSON.parse(value);
        state.accounts = value && value.userAccounts;
        state.isUnlocked = value && value.isUnlocked;
        state.getWalletDetaillsLoading = false;
      }
    },
  },
});

export const { getWalletDetails } = onboardingSlice.actions;

export default onboardingSlice.reducer;
