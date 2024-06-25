const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const add = require("./add");
const leave = require("./leave");

// register routes
router.post("/add", [tokenVerification, add]);
router.post("/leave", [tokenVerification, leave]);

module.exports = router;
