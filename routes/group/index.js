const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const add = require("./add");
const leave = require("./leave");
const remove = require("./remove");
const update = require("./update");

// register routes
router.post("/add", [tokenVerification, add]);
router.post("/leave", [tokenVerification, leave]);
router.post("/remove", [tokenVerification, remove]);
router.post("/update", [tokenVerification, update]);

module.exports = router;
