const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const signUp = require("./signup");
const login = require("./login");
const logout = require("./logout");
const update = require("./update");
const data = require("./data");

// register routes
router.post("/signup", signUp);
router.post("/login", login);
router.delete("/logout", [tokenVerification, logout]);
router.post("/update", [tokenVerification, update]);
router.get("/data", [tokenVerification, data]);

module.exports = router;
