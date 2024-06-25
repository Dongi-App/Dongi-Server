const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const send = require("./send");
const respond = require("./respond");

// register routes
router.post("/send", [tokenVerification, send]);
router.post("/respond", [tokenVerification, respond]);

module.exports = router;
