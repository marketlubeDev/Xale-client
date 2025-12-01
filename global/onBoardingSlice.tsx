import { createSlice } from "@reduxjs/toolkit";

interface OnBoardingSliceState {
  companyName: string | null;
  option: string | null;

  companyLocation: string;
  companyLogoUrl: string;
  companyLogo: string;

  plan: number;
}

const initialState: OnBoardingSliceState = {
  companyName: "",
  option: "",

  companyLocation: "",
  companyLogoUrl: "",
  companyLogo: "",

  plan: 1,
};

const onBoardingSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCompanyNameAndOption(state, action) {
      state.companyName = action.payload.companyName;
      state.option = action.payload.optioin;
    },
    setCompanyLocationAndLogo(state, action) {
      state.companyLocation = action.payload.companyLocation;
      if (action.payload.companyLogoUrl) {
        state.companyLogoUrl = action.payload.companyLogoUrl;
        state.companyLogo = "";
      } else if (action.payload.companyLogo) {
        state.companyLogoUrl = action.payload.companyLogo;
        state.companyLogoUrl = "";
      }
    },
    setPlan(state, action) {
      state.plan = action.payload;
    },
  },
});

export const { setCompanyNameAndOption, setCompanyLocationAndLogo, setPlan } =
  onBoardingSlice.actions;
export default onBoardingSlice.reducer;
