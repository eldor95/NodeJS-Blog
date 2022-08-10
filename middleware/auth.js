const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect("/");
    }
    next();
  });

  // fetch qilamiz
  // verify user
  // if  user valid, permit request
  // else redirect
};
