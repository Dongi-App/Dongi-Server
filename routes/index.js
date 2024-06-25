const express = require("express");

// import api folders
const user = require("./user");
const group = require("./group");

// init express router
const router = express.Router();

// register api folders
router.use("/user", user);
router.use("/group", group);

module.exports = router;
