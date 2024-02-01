import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./onboarding/onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
});
