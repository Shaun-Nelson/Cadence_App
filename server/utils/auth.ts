const jwt = require("jsonwebtoken");
const User = require("../models/User");
const path = require("path");
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const secret = process.env.JWT_SECRET;
const expiration = "14d";

declare module "express-session" {
  interface SessionData {
    logged_in: boolean;
  }
}

interface CustomRequest extends Request {
  user?: any;
}

module.exports = {
  signToken: function (res: Response, userId: ObjectId) {
    try {
      const payload = { _id: userId };
      const token = jwt.sign(payload, secret, {
        expiresIn: expiration,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error signing token");
    }
  },
  getUser: function (token: string) {
    try {
      if (!token) {
        return null;
      }
      return jwt.verify(token, secret);
    } catch {
      console.log("Invalid token");
      return null;
    }
  },
  isLoggedIn: function (req: Request, res: Response, next: NextFunction) {
    if (req.session?.logged_in) {
      next();
    }
    return res.status(401).send("Unauthorized");
  },
  authMiddleware: function (req: Request, res: Response, next: NextFunction) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      (req as CustomRequest).user = data;
      next();
    } catch {
      console.log("Invalid token");
      return res.status(401).json("Invalid token");
    }

    return req;
  },
  protect: async function (req: Request, res: Response, next: NextFunction) {
    let token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded._id);

        if (!user) {
          return res.status(401).send("Unauthorized. Invalid token.");
        } else {
          (req as CustomRequest).user = user;
          next();
        }
      } catch (error) {
        console.error(error);
        return res.status(401).send("Unauthorized. Invalid token.");
      }
    } else {
      return res.status(401).send("Unauthorized. No token provided.");
    }
  },
  checkSpotifyIsLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.access_token || !req.cookies.refresh_token) {
      return res.status(401).json({
        message: "Unauthorized. Please connect to Spotify first.",
      });
    } else {
      next();
    }
  },
};
