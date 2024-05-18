const router = require("express").Router();
const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  createSpotifyPlaylist,
} = require("../../controllers/playlistsController");
const { protect, checkSpotifyIsLoggedIn } = require("../../utils/auth");

// Matches with "/api/playlists"
router
  .route("/")
  .get(protect, getPlaylists)
  .post(protect, createPlaylist)
  .delete(protect, deletePlaylist);
router
  .route("/spotify")
  .post(protect, checkSpotifyIsLoggedIn, createSpotifyPlaylist);

module.exports = router;
