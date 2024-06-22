const mongoose = require("mongoose");
const { DB_URL } = require("../");

mongoose.connect(DB_URL);

module.exports = mongoose;
