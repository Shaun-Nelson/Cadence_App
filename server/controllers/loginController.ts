const User = require("../models/User");
const SpotifyWebApi = require("spotify-web-api-node");
const { signToken } = require("../utils/auth");
require("dotenv").config();

module.exports = {
  authUser: async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (user && (await user.isCorrectPassword(password))) {
        signToken(res, user._id);
        req.session.save(() => {
          req.session.user_id = user._id;
          req.session.logged_in = true;

          return res.status(200).send({ user });
        });
      } else {
        res.status(400).send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error authenticating user" });
    }
  },
  isLoggedIn: (req: any, res: any) => {
    try {
      if (req.session.logged_in) {
        return res
          .status(200)
          .json({ logged_in: true, user_id: req.session.user_id });
      } else {
        return res.status(200).json({ logged_in: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error checking login status" });
    }
  },
  login: async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });

      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        return res.status(400).send({ message: "Invalid password" });
      }

      signToken(res, user._id);

      req.session.save(() => {
        req.session.user_id = user._id;
        req.session.logged_in = true;

        return res.status(201).json({ id: user._id, username: user.username });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Error logging in. Please verify that your username and/or password is correct.",
      });
    }
  },
  loginSpotify: async (req: any, res: any) => {
    try {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      });
      const scopes = [
        "playlist-modify-public",
        "playlist-modify-private",
        "playlist-read-private",
        "playlist-read-collaborative",
      ];
      const state = generateRandomString(16);
      const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

      res.cookie("spotify_auth_state", state, {
        secure: true,
        httpOnly: false,
        sameSite: "none",
      });

      req.session.state = state;
      req.session.save((err: any) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).send({ message: "Session save error" });
        }
        return res.status(200).json({ url: authorizeURL });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error logging in with Spotify" });
    }
  },
};

const generateRandomString = (length: number) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
