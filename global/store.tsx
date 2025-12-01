import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import baseSlice from "./basicSlice";
import onBoardingSlice from "./onBoardingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    basic: baseSlice,
    onBoarding: onBoardingSlice,
  },
});
