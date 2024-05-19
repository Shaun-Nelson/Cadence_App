const spotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const LOCAL_DOMAIN = "localhost";
const PRODUCTION_DOMAIN = "cadenceapp.netlify.app";

module.exports = {
  async callback(req: any, res: any) {
    console.log("Callback route hit. Cookies:", req.cookies);
    const code = req.query.code;
    const state = req.query.state;

    console.log("Session:", req.session);

    if (state !== req.session.state) {
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

      // res.cookie("access_token", accessToken, {
      //   secure: true,
      //   httpOnly: false,
      //   sameSite: "none",
      // });
      // res.cookie("refresh_token", refreshToken, {
      //   secure: true,
      //   httpOnly: false,
      //   sameSite: "none",
      // });

      req.session.access_token = accessToken;
      req.session.refresh_token = refreshToken;
      req.session.spotifyApi = spotifyApi;

      req.session.save((err: any) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).send({ message: "Session save error" });
        }

        return res.status(200).redirect(process.env.CLIENT_URL);
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
