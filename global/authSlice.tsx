import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  currentUser: any | null;
}

// --- HELPER: Check if JWT is expired ---
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

// --- INITIALIZATION LOGIC ---
// 1. Get raw data from storage
const storedToken = localStorage.getItem("xale_access_token");
const storedUser = localStorage.getItem("xale_current_user");

let validToken: string | null = storedToken;
let validUser: any | null = storedUser ? JSON.parse(storedUser) : null;

// 2. Check Expiration
if (isTokenExpired(storedToken)) {
  // 3. If expired, WIPE EVERYTHING
  localStorage.removeItem("xale_access_token");
  localStorage.removeItem("xale_current_user");

  validToken = null;
  validUser = null; // Ensure user is removed from state too
}

const initialState: AuthState = {
  token: validToken,
  currentUser: validUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("xale_access_token", action.payload);
      } else {
        localStorage.removeItem("xale_access_token");
      }
    },
    setCurrentUser(state, action: PayloadAction<any | null>) {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem(
          "xale_current_user",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("xale_current_user");
      }
    },
    setTokenAndUser(state, action: PayloadAction<any | null>) {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
        localStorage.setItem(
          "xale_current_user",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("xale_current_user");
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("xale_access_token", action.payload.token);
      } else {
        localStorage.removeItem("xale_access_token");
      }
    },

    logout(state) {
      state.token = null;
      state.currentUser = null;
      localStorage.removeItem("xale_access_token");
      localStorage.removeItem("xale_current_user");
    },
  },
});

export const { setToken, setCurrentUser, setTokenAndUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
