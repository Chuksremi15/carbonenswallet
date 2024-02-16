import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers, BigNumber, formatEther } from "ethers";
import redstone from "redstone-api";
// import { openModal } from "../modal/modalSlice";

const initialState = {
  balance: 0,
  transactions: [],
  usdBalance: 0,
  getBalanceLoading: true,
  getTransactionsLoading: true,
};

const etherscanUrl = (address, action) => {
  return `https://api-sepolia.etherscan.io/api?module=account&action=${action}&address=${address}&startblock=0endblock=99999999&page=1&offset=10&sort=asc&apikey=ID8G2U6S2EWZYZ7JKPWXIFIY7SUDZFX5EP`;
};

const url =
  "https://eth-sepolia.g.alchemy.com/v2/i__hU94P_jyFKF1ZcwVpE4Uamw0VB71z";

export let provider = new ethers.JsonRpcProvider(url);

function financial(x) {
  return Number.parseFloat(x).toFixed(4);
}

export const getBalance = createAsyncThunk(
  "transaction/getBalance",
  async ({ address }, thunkAPI) => {
    try {
      let response = await provider.getBalance(address);
      let balance = formatEther(response);

      const price = await redstone.getPrice("ETH");
      const usdBalance = Math.round(price.value * balance * 100) / 100;
      // thunkAPI.dispatch(getUSDBalance(response));

      balance = financial(balance);

      return { ethBalance: balance, usdBalance };
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async ({ address }, thunkAPI) => {
    try {
      const etherUrl = etherscanUrl(address, "txlist");
      let response = await axios.get(etherUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getUSDBalance = createAsyncThunk(
  "transaction/getUSDBalance",
  async (balance, thunkAPI) => {
    try {
      const price = await redstone.getPrice("ETH");
      const response = Math.round(price.value * balance * 100) / 100;
      return response;
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
        state.balance = action.payload.ethBalance;
        state.usdBalance = action.payload.usdBalance;
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
      })
      .addCase(getUSDBalance.fulfilled, (state, action) => {
        state.usdBalance = action.payload;
      });
  },
});

// console.log(onboardingSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
