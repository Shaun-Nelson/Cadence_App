import { apiSlice } from "./apiSlice";

const USERS_URL = "/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/login`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/users/logout`,
        method: "POST",
        withCredentials: true,
      }),
    }),
    loginSpotify: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/login/spotify`,
        method: "GET",
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useLoginSpotifyMutation,
  useSignupMutation,
} = usersApiSlice;
