const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const add = require("./add");

// register routes
router.post("/add", [tokenVerification, add]);

module.exports = router;
