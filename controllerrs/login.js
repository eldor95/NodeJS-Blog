module.exports = (req, res) => {
  res.render("login", {
    log: req.flash("log"),
  });
};
