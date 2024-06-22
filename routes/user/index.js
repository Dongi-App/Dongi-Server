const express = require("express");
const router = express.Router();
const signUp = require("./signup");
const login = require("./login")

router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
