const Post = require("../models/post.js");

module.exports = class PostCtrl {
  static async apiCreatePost(req, res) {
    try {
      const { title, body } = req.body;
      if (!title || !body) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      req.user.password = undefined;
      const post = new Post({
        title,
        body,
        photo: "No photo available",
        postedBy: req.user,
      });
      const result = await post.save();
      if (result) {
        res.json({ post: result });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async apiGetAllPosts(req, res) {
    try {
      const mypost = await Post.find().populate("postedBy", "_id name");
      if (mypost) {
        res.json({ mypost });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async apiGetMyPost(req, res) {
    try {
      const mypost = await Post.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "_id name"
      );
      if (mypost) {
        res.json({ mypost });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
