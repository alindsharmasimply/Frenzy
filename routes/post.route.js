const express = require("express");
const router = express.Router();
const PostCtrl = require("../controllers/post.controller");
const requireLogin = require("../middleware/requireLogin");

router.post("/createPost", requireLogin, PostCtrl.apiCreatePost);
router.get("/getAllPosts", requireLogin, PostCtrl.apiGetAllPosts);
router.get("/myPost", requireLogin, PostCtrl.apiGetMyPost);

module.exports = router;
