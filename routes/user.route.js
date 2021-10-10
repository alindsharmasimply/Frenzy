const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const UserCtrl = require("../controllers/user.controller");

router.get("/user/:id", requireLogin, UserCtrl.apiGetUserProfile);
router.put("/follow", requireLogin, UserCtrl.apiFollowUser);
router.put("/unfollow", requireLogin, UserCtrl.apiUnFollowUser);
router.put("/updatepic", requireLogin, UserCtrl.apiUpdatePic);
router.post("/search-users", UserCtrl.apiSearchUsers);

module.exports = router;
