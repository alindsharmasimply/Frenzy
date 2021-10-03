const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    //authorization === Bearer ewefwegwrherhe
    if (!authorization) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    const response = await jwt.verify(token, process.env.JWT_SECRET);
    if (response._id) {
      const { _id } = response;
      const userdata = await User.findById(_id);
      if (userdata) {
        req.user = userdata;
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ error: "you must be logged in" });
  }
};
