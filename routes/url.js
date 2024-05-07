const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetanalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetanalytics);

module.exports = router;
