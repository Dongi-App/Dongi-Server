const express = require("express");
const router = express.Router();
const signUp = require("./signup");

router.post("/signup", signUp);

module.exports = router;
