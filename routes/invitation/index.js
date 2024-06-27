const express = require("express");
const router = express.Router();

// middlewares
const { tokenVerification } = require("../../middleware");

// routes
const send = require("./send");
const respond = require("./respond");
const list = require("./list");
const data = require("./data");

// register routes
router.post("/send", [tokenVerification, send]);
router.post("/respond", [tokenVerification, respond]);
router.get("/list", [tokenVerification, list]);
router.get("/data", [tokenVerification, data]);

module.exports = router;
