const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const signUp = require("./signup");
const login = require("./login");
const logout = require("./logout");

// register routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", [tokenVerification, logout]);

module.exports = router;
