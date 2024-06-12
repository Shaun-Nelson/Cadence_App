import { useState } from "react";
import { useCookies } from "react-cookie";
import SpotifyPlayer, { Props } from "react-spotify-web-playback";
import { useRefreshSpotifyAccessTokenMutation } from "../slices/thirdPartyApiSlice";

interface PlayerWrapperProps {
  spotifyIds: string[];
}

export default function PlayerWrapper({ spotifyIds }: PlayerWrapperProps) {
  const [cookies] = useCookies(["access_token", "expires_in"]);
  const [accessToken, setAccessToken] = useState<string>(cookies.access_token);
  const [expiresAt, setExpiresAt] = useState<number>(
    parseInt(cookies.expires_in)
  );

  const [refreshSpotifyAccessToken] = useRefreshSpotifyAccessTokenMutation();

  const getOAuthToken: Props["getOAuthToken"] = async (callback) => {
    if (accessToken && expiresAt > Date.now()) {
      callback(accessToken);

      return;
    }
    try {
      await refreshSpotifyAccessToken({}).unwrap();

      setAccessToken(cookies.access_token);
      setExpiresAt(cookies.expires_in);

      callback(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpotifyPlayer
      getOAuthToken={getOAuthToken}
      token={accessToken}
      uris={spotifyIds}
    />
  );
}
