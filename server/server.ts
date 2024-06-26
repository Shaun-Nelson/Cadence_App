const express = require("express");
const db = require("./config/connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
  store: MongoStore.create({
    mongoUrl:
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : "mongodb://localhost:27017/cadence_db",
  }),
  proxy: process.env.NODE_ENV === "production",
};
const corsConfig = {
  origin: process.env.CLIENT_URL || "http://localhost:5137",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  app.set("trust proxy", 1);
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
