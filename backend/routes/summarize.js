const express = require("express");
const router = express.Router();
const { summarizeAndSend } = require("../controllers/summarizeController");

router.post("/", summarizeAndSend);

module.exports = router;