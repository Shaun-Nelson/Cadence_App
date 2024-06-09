import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SpotifyPlayer, { Props } from "react-spotify-web-playback";

import refreshAccessToken from "../utils/spotifyRefreshTokenRequest";

export default function PlayerWrapper() {
  const [cookies] = useCookies(["access_token", "expires_in"]);
  const [accessToken, setAccessToken] = useState<string>(cookies.access_token);
  const [expiresAt, setExpiresAt] = useState<string>(cookies.expires_in);

  const { results } = useSelector((state: RootState) => state.results);
  const uris = results.map((result) => result.spotifyId);

  const getOAuthToken: Props["getOAuthToken"] = async (callback) => {
    if (parseInt(expiresAt) > Date.now()) {
      callback(accessToken);

      return;
    }

    refreshAccessToken();

    setAccessToken(cookies.access_token);
    setExpiresAt(cookies.expires_in);

    callback(accessToken);
  };

  return (
    <SpotifyPlayer
      getOAuthToken={getOAuthToken}
      token={accessToken}
      uris={uris}
    />
  );
}
