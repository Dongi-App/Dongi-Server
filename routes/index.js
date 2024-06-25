const express = require("express");

// import api folders
const user = require("./user");
const group = require("./group");
const invitation = require("./invitation");
const expense = require("./expense");

// init express router
const router = express.Router();

// register api folders
router.use("/user", user);
router.use("/group", group);
router.use("/invitation", invitation);
router.use("/expense", expense);

module.exports = router;
