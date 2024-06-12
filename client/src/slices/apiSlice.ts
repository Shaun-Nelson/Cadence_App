import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RefreshTokenResponse } from "../types";
import { setRefreshToken, setJwt, logout } from "./authSlice";
import { RootState } from "../store";
import { Mutex } from "async-mutex";
import { jwtDecode } from "jwt-decode";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const accessToken: string = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      const accessTokenIsExpired =
        (jwtDecode(accessToken).exp as number) * 1000 < Date.now();
      if (!accessTokenIsExpired) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      } else {
        headers.delete("Authorization");
      }
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = (await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: {
              refreshToken: (api.getState() as RootState).auth.refreshToken,
            },
          },
          api,
          extraOptions
        )) as { data: RefreshTokenResponse };
        if (refreshResult.data) {
          api.dispatch(setRefreshToken(refreshResult.data.refreshToken));
          api.dispatch(setJwt(refreshResult.data.accessToken));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Playlist"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),
    isLoggedIn: builder.query({
      query: () => "/users/login",
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        withCredentials: true,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
    }),
    getPlaylists: builder.mutation({
      query: () => ({
        url: "/playlists",
        method: "GET",
        withCredentials: true,
      }),
    }),
    createPlaylist: builder.mutation({
      query: (body) => ({
        url: "/playlists",
        method: "POST",
        body,
        withCredentials: true,
      }),
      invalidatesTags: ["Playlist"],
    }),
    deletePlaylist: builder.mutation({
      query: (body) => ({
        url: `/playlists/${body.id}`,
        method: "DELETE",
        body,
        withCredentials: true,
      }),
      invalidatesTags: ["Playlist"],
    }),
    loginSpotify: builder.mutation({
      query: () => ({
        url: "/login/spotify",
        method: "GET",
        withCredentials: true,
      }),
    }),
    saveSpotifyPlaylist: builder.mutation({
      query: (body) => ({
        url: "/playlists/spotify",
        method: "POST",
        body,
        withCredentials: true,
      }),
    }),
  }),
});
