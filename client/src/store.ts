import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import resultsReducer from "./slices/resultsSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    results: resultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
