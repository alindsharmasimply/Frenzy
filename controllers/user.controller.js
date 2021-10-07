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
  static async apiFollowUser(req, res) {
    try {
      const result = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { followers: req.user._id },
        },
        {
          new: true,
        }
      );
      if (result) {
        const result = await User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { following: req.body.followId },
          },
          { new: true }
        ).select("-password");

        if (result) {
          res.json(result);
        }
      }
    } catch (error) {
      return res.status(422).json({ error: error });
    }
  }
  static async apiUnFollowUser(req, res) {
    try {
      const result = await User.findByIdAndUpdate(
        req.body.unfollowId,
        {
          $pull: { followers: req.user._id },
        },
        {
          new: true,
        }
      );
      if (result) {
        const result = await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { following: req.body.unfollowId },
          },
          { new: true }
        ).select("-password");

        if (result) {
          res.json(result);
        }
      }
    } catch (error) {
      return res.status(422).json({ error: error });
    }
  }
  static async apiUpdatePic(req, res) {
    try {
      const result = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { pic: req.body.pic } },
        { new: true }
      );
      if (result) {
        res.json(result);
      }
    } catch (error) {
      return res.status(422).json({ error: "Pic cannot be posted" });
    }
  }
};
