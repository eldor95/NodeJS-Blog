const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  // try to find
  // compare user's password
  // if user's password is correct, then login
  // else
  // redicet to loginn page
  if (req.body) {
    const loginData = req.body.email;
    req.flash("log", loginData);
  }

  const { password, email } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (user) {
      const validetPass = await bcrypt.compare(password, user.password);
      if (validetPass) {
        req.session.userId = user._id;
        res.redirect("/");
      } else res.redirect("/login");
    } else {
      return res.redirect("/login");
    }
  });
};
