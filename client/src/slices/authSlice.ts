import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "../utils/tokenLocalStorage";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || '"')
    : null,
  token: localStorage.getItem("token") || "",
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
      state.token = action.payload;
      setToken(action.payload);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
    loginSpotify: () => {
      fetch("/api/login/spotify", {
        method: "GET",
        credentials: "include",
      });
    },
  },
});

export const { setCredentials, setJwt, logout, loginSpotify } =
  authSlice.actions;

export default authSlice.reducer;
