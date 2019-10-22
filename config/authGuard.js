module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Por favor, entre na sua conta");
    res.redirect("/auth/login");
  },

  forward: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect("/dashboard");
  }
};
