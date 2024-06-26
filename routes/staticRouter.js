const express = require("express");
const URL = require("../models/url");
const { checkForAuthentication, restrictTo } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.user != null) {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
      urls: allUrls,
    });
  } else {
    return res.render("login");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
