import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { openModal } from "../modal/modalSlice";
import { browserHistory } from "react-router";

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

      console.log(value);

      if (value === null) {
        state.accounts = null;
      } else {
        value = JSON.parse(value);
        state.accounts = value && value.userAccounts;
        state.getWalletDetaillsLoading = false;
      }
    },
  },
});

export const { getWalletDetails } = onboardingSlice.actions;

export default onboardingSlice.reducer;
