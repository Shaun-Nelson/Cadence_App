const User = require("../models/User");

module.exports = {
  getUserProfile: async function (req: any, res: any) {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: `Error getting user: ${error}` });
    }
  },
  updateUserProfile: async function (req: any, res: any) {
    try {
      const user = await User.findById(req.user._id);
      user.username = req.body.username || user.username;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: `Error updating user: ${error}` });
    }
  },
};
