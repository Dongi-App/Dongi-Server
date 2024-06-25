const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const send = require("./send");

// register routes
router.post("/send", [tokenVerification, send]);

module.exports = router;
