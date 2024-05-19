const router = require("express").Router();
const path = require("path");
const callbackRoutes = require("./callback");
const loginRoutes = require("./login");
const openAIRoutes = require("./openAI");
const signUpRoutes = require("./signUp");
const logoutRoutes = require("./logout");
const userRoutes = require("./user");
const playlistsRoutes = require("./playlists");

// base URL: /api
router.use("/callback", callbackRoutes);
router.use("/login", loginRoutes);
router.use("/openai", openAIRoutes);
router.use("/signup", signUpRoutes);
router.use("/logout", logoutRoutes);
router.use("/user", userRoutes);
router.use("/playlists", playlistsRoutes);

router.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
