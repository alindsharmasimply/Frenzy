const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
});

module.exports = User = mongoose.model("User", userschema);
