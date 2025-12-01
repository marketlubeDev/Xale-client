import { createSlice } from "@reduxjs/toolkit";

interface BasicState {
  isOnBoarded: boolean | null;
}

const initialState: BasicState = {
  isOnBoarded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsOnBoarded(state, action) {
      state.isOnBoarded = action.payload;
    },
  },
});

export const { setIsOnBoarded } = authSlice.actions;
export default authSlice.reducer;
