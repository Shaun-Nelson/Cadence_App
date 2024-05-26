const Playlist = require("../models/Playlist");
const spotifyWebApi = require("spotify-web-api-node");

type Track = {
  title: string;
  image: string;
  link: string;
  artists: [];
  duration: string;
  previewUrl: string;
};

module.exports = {
  getPlaylists: async function (req: any, res: any) {
    try {
      const playlists = await Playlist.find({
        username: req.user.username,
      }).populate("tracks");

      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: `Error getting playlists: ${error}` });
    }
  },
  createPlaylist: async function (req: any, res: any) {
    try {
      const playlistConfig = {
        name: req.body.name,
        description: req.body.playlistDescription
          ? req.body.playlistDescription
          : "",
        tracks: JSON.parse(req.body.tracks),
        username: req.user.username,
      };
      const playlist = await Playlist.create(playlistConfig);

      return res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating playlist: ${error}` });
    }
  },
  deletePlaylist: async function (req: any, res: any) {
    try {
      const playlist = await Playlist.deleteOne({
        name: req.body.name,
        username: req.user.username,
      });
      res.status(200).json({ message: "Playlist deleted", playlist });
    } catch (error) {
      res.status(500).send({ message: `Error deleting playlist: ${error}` });
    }
  },
  createSpotifyPlaylist: async function (req: any, res: any) {
    const { name, description } = req.body;
    const tracks = req.body.tracks ? JSON.parse(req.body.tracks) : [];

    if (!tracks) {
      return res
        .status(400)
        .json({ message: "Please provide tracks to add to playlist" });
    }

    const spotifyApi = new spotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      accessToken: req.cookies.access_token,
      refreshToken: req.cookies.refresh_token,
    });

    refreshSpotifyTokens(spotifyApi);

    try {
      const playlist = await createSpotifyPlaylist(
        spotifyApi,
        tracks,
        name,
        description
      );

      return res.status(201).json({ message: "Playlist created", playlist });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating playlist: ${error}` });
    }
  },
};

const refreshSpotifyTokens = async (spotifyApi: any) => {
  spotifyApi.refreshAccessToken().then(
    (data: any) => {
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    (err: any) => {
      console.error("Could not refresh access token", err);
    }
  );
};

const createSpotifyPlaylist = async (
  spotifyApi: any,
  tracks: Track[],
  name: string,
  description: string
) => {
  const tracksToAdd = tracks.map((track: Track) => track.link);

  try {
    const playlist = await spotifyApi.createPlaylist(name, {
      description,
      public: true,
    });
    const playlistId = playlist.body.id;

    await spotifyApi.addTracksToPlaylist(playlistId, tracksToAdd);

    return playlist;
  } catch (error) {
    console.error("Error creating Spotify playlist", error);
    return { message: "Error creating Spotify playlist" };
  }
};
