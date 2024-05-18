const spotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

module.exports = {
  async callback(req: any, res: any) {
    console.log("Callback route hit. CookiesL", req.cookies);
    const code = req.query.code;
    const state = req.query.state;

    if (state !== req.cookies["spotify_auth_state"]) {
      return res.status(400).send({ message: "Invalid state" });
    }

    if (!code) {
      return res.status(400).send({ message: "Authorization code is missing" });
    }

    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    try {
      const { accessToken, refreshToken } = await getSpotifyTokens(
        code,
        spotifyApi
      );
      setSpotifyTokens(accessToken, refreshToken, spotifyApi);
      setTokensCookies(accessToken, refreshToken, res);

      req.session.save((err: any) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).send({ message: "Session save error" });
        }
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;
        req.session.spotifyApi = spotifyApi;

        res.status(200).redirect(process.env.CLIENT_URL);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Invalid Spotify token" });
    }
  },
};

const getSpotifyTokens = async (code: string, spotifyApi: any) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body["access_token"];
    const refreshToken = data.body["refresh_token"];

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error getting Spotify tokens:", error);
    throw new Error("Error getting Spotify tokens");
  }
};

const setSpotifyTokens = (
  accessToken: string,
  refreshToken: string,
  spotifyApi: any
) => {
  try {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
  } catch (error) {
    console.error("Error setting Spotify tokens:", error);
    throw new Error("Error setting Spotify tokens");
  }
};

const setTokensCookies = (
  accessToken: string,
  refreshToken: string,
  res: any
) => {
  try {
    res.cookie("access_token", accessToken, { httpOnly: true, secure: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true });
  } catch (error) {
    console.error("Error setting cookies:", error);
    throw new Error("Error setting cookies");
  }
};
