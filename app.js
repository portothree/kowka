require("dotenv").config({ path: ".env" });

const express = require("express");
var ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
require("./config/passport")(passport);

const app = express();

const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect to mongodb"))
  .catch(err => console.log(err));

// ejs
app.use(express.static(__dirname + "/views"));
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

// bodyparser
app.use(express.urlencoded({ extended: false }));

// session, passport and flash
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});

// routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3333;

app.listen(PORT, console.log(`Server running on ${PORT}`));
