const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forward } = require("../middleware/authGuard");

router.get("/", forward, (req, res) => res.render("index"));

router.get("/dashboard", ensureAuthenticated, (req, res) => res.render("dashboard", {
    user: req.user
}));

module.exports = router;
