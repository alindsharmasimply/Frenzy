const Post = require("../models/post");
const User = require("../models/user");

module.exports = class UserCtrl {
  static async apiGetUserProfile(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).select(
        "-password"
      );
      if (user) {
        const posts = await Post.find({ postedBy: req.params.id })
          .populate("postedBy", "_id name")
          .exec();

        if (posts) {
          res.json({ user, posts });
        }
      }
    } catch (error) {
      return res.status(422).json({ error: error });
    }
  }
};
