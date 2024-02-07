import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers, BigNumber } from "ethers";
// import { openModal } from "../modal/modalSlice";

const initialState = {
  balance: 0,
  transactions: [],
  usdBalance: 0,
  getBalanceLoading: true,
  getTransactionsLoading: true,
};

let etherscanUrl = `https://api.etherscan.io/api
?module=account
&action=txlist
&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC
&startblock=0
&endblock=99999999
&page=1
&offset=10
&sort=asc
&apikey=YourApiKeyToken`;

const url =
  "https://eth-sepolia.g.alchemy.com/v2/i__hU94P_jyFKF1ZcwVpE4Uamw0VB71z";

let provider = new ethers.JsonRpcProvider(url);

export const getBalance = createAsyncThunk(
  "transaction/getBalance",
  async ({ address }, thunkAPI) => {
    try {
      let response = await provider.getBalance(address);
      response = Number(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async ({ address }, thunkAPI) => {
    try {
      let response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=ID8G2U6S2EWZYZ7JKPWXIFIY7SUDZFX5EP`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const onboardingSlice = createSlice({
  name: "transaction",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.getBalanceLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.getBalanceLoading = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.getBalanceLoading = false;
      })
      .addCase(getTransactions.pending, (state) => {
        state.getTransactionsLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.result;
        state.getTransactionsLoading = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.getTransactionsLoading = false;
      });
  },
});

// console.log(onboardingSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
