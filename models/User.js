const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please, check your Username"],
  },
  email: {
    type: String,
    required: [true, "Please, check your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, check your Password"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
