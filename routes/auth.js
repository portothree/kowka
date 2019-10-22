const express = require("express");
const passport = require("passport");
const router = express.Router();
const { forward } = require("../config/authGuard");
const User = require("../models/User");

router.get("/login", forward, (req, res) => res.render("login"));

router.get("/register", forward, (req, res) => res.render("register"));
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  // checks
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Preencha todos os campos" });
  }

  if (password != password2) {
    errors.push({ msg: "As senhas não combinam" });
  }

  if (password.length < 6) {
    errors.push({ msg: "A senha deve ter pelo menos 6 caracteres" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email já cadastrado" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        newUser
          .save()
          .then(user => {
            req.flash(
              "success_msg",
              "Agora você está registrado e pode entrar na sua conta."
            );
            res.redirect("/auth/login");
          })
          .catch(err => console.log(err));
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Você saiu da sua conta");
  res.redirect("/auth/login");
});

module.exports = router;
