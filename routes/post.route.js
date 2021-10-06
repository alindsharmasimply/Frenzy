const express = require("express");
const router = express.Router();
const PostCtrl = require("../controllers/post.controller");
const requireLogin = require("../middleware/requireLogin");

router.post("/createPost", requireLogin, PostCtrl.apiCreatePost);
router.get("/getAllPosts", requireLogin, PostCtrl.apiGetAllPosts);
router.get("/myPost", requireLogin, PostCtrl.apiGetMyPost);
router.put("/like", requireLogin, PostCtrl.apiLikeAPost);
router.put("/unlike", requireLogin, PostCtrl.apiUnlikeAPost);
router.put("/comment", requireLogin, PostCtrl.apiCommentOnAPost);
router.delete("/deletepost/:postId", requireLogin, PostCtrl.apiDeleteAPost);

module.exports = router;
