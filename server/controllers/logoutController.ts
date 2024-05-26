const User = require("../models/User");

module.exports = {
  logout: async function (req: any, res: any) {
    try {
      const user = await User.findOne({ _id: req.session.user_id });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      clearCookies(req, res);
      req.session.destroy();

      res.status(200).json({ message: "User logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging out user" });
    }
  },
};

const clearCookies = (req: any, res: any) => {
  for (const key in req.cookies) {
    res.clearCookie(key);
  }

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
