const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/auth.controller");
const requireLogin = require("../middleware/requireLogin");

// router.get("/", ArticleCtrl.apiGetAllArticles);
// router.post("/", ArticleCtrl.apiCreateArticle);
// router.get("/article/:id", ArticleCtrl.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

router.get("/protected", requireLogin, (req, res) => {
  res.json("Mast haiiiiiiiii  !!!!!!");
});

router.post("/signin", UserCtrl.apiUserSignIn);

router.post("/signup", UserCtrl.apiUserSignUp);

module.exports = router;
