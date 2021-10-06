const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const UserCtrl = require("../controllers/user.controller");

router.get("/user/:id", requireLogin, UserCtrl.apiGetUserProfile);

module.exports = router;
