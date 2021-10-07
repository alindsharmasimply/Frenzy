const Post = require("../models/post.js");

module.exports = class PostCtrl {
  static async apiCreatePost(req, res) {
    try {
      const { title, body, pic } = req.body;
      if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      req.user.password = undefined;
      const post = new Post({
        title,
        body,
        photo: pic,
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
      const posts = await Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
      if (posts) {
        res.json({ posts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async apiGetMyPost(req, res) {
    try {
      const mypost = await Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
      if (mypost) {
        res.json({ mypost });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async apiLikeAPost(req, res) {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.user._id } },
        { new: true }
      ).exec();
      if (result) {
        res.json({ result });
      } else {
        return res.status(422).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: error });
    }
  }
  static async apiUnlikeAPost(req, res) {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).exec();
      if (result) {
        res.json({ result });
      } else {
        return res.status(422).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: error });
    }
  }
  static async apiCommentOnAPost(req, res) {
    try {
      const comment = {
        text: req.body.text,
        postedBy: req.user._id,
      };
      const result = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        {
          new: true,
        }
      )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec();
      if (result) {
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: error });
    }
  }
  static async apiDeleteAPost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec();
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        const result = await post.remove();
        res.json(result);
      }
    } catch (error) {
      return res.status(422).json({ error: error });
    }
  }
  static async apiGetSubPost(req, res) {
    try {
      const posts = await Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt");
      if (posts) {
        res.json({ posts });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
