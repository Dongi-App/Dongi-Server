const mongoose = require("mongoose");
const membershipSchema = require("./schema");

const membership = mongoose.model("membership", membershipSchema);

module.exports = membership;
