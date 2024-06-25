const mongoose = require("mongoose");
const shareSchema = require("./schema");

const share = mongoose.model("share", shareSchema);

module.exports = share;
