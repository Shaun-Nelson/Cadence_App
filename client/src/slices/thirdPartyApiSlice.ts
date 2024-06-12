import { apiSlice } from "./apiSlice";

const USERS_URL = "";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginSpotify: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/login/spotify`,
        method: "GET",
        withCredentials: true,
      }),
    }),
    getAiData: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/openai`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    refreshSpotifyAccessToken: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/spotify/refresh`,
        method: "POST",
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useLoginSpotifyMutation,
  useGetAiDataMutation,
  useRefreshSpotifyAccessTokenMutation,
} = usersApiSlice;
