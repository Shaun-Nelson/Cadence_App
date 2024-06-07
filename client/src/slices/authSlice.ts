import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || '"')
    : null,
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setJwt: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("results");
      localStorage.removeItem("refreshToken");
    },
    loginSpotify: () => {
      fetch("/api/login/spotify", {
        method: "GET",
        credentials: "include",
      });
    },
  },
});

export const { setCredentials, setJwt, setRefreshToken, logout, loginSpotify } =
  authSlice.actions;

export default authSlice.reducer;
