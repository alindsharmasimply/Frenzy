const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/auth.controller");
const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.json("Mast haiiiiiiiii  !!!!!!");
});

router.post("/signin", UserCtrl.apiUserSignIn);

router.post("/signup", UserCtrl.apiUserSignUp);

module.exports = router;
