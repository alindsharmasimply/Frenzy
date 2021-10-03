//const ArticleService = require("../services/ArticleService");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports = class UserCtrl {
  static async apiUserSignUp(req, res) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields." });
      }
      const savedUser = await User.findOne({ email: email });
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists for that email." });
      }
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.HASHKEY)
      );
      const user = {
        email,
        password: hashedPassword,
        name,
      };
      const response = await new User(user).save();

      if (response) {
        res.json({
          message: "Saved Successfully",
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async apiUserSignIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
      }
      const savedUser = await User.findOne({ email: email });
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
      const doMatch = await bcrypt.compare(password, savedUser.password);
      if (doMatch) {
        // res.json({message:"successfully signed in"})
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        //const { _id, name, email, followers, following, pic } = savedUser;
        res.json({
          token,
          //user: { _id, name, email, followers, following, pic },
        });
      } else {
        return res.status(422).json({ error: "Invalid Email or password" });
      }
    } catch (error) {
      console.log(err);
    }
  }
};
