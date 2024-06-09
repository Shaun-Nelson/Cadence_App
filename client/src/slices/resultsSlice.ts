import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../types";

const initialState = {
  results: [] as Track[],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
      localStorage.setItem("results", JSON.stringify(action.payload));
    },
  },
});

export const { setResults } = resultsSlice.actions;

export default resultsSlice.reducer;
