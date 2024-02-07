import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { openModal } from "../modal/modalSlice";

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
      value = JSON.parse(value);
      state.accounts = value.userAccounts;
      state.getWalletDetaillsLoading = false;
    },
  },
});

export const { getWalletDetails } = onboardingSlice.actions;

export default onboardingSlice.reducer;
