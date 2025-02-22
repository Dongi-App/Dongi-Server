const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.expiredToken = require("./expired_token");
db.group = require("./group");
db.membership = require("./membership");
db.invitation = require("./invitation");
db.expense = require("./expense");
db.share = require("./share");

module.exports = db;
