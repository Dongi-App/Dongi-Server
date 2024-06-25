const mongoose = require("mongoose");
const groupSchema = require("./schema");

const group = mongoose.model("group", groupSchema);

module.exports = group;
