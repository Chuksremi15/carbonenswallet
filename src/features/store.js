import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboarding/onboardingSlice";
import transactionReducer from "./transactionSlice/transactionSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    transaction: transactionReducer,
  },
});
