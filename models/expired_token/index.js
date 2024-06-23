const mongoose = require("mongoose");
const expiredTokenSchema = require("./schema");

const expiredToken = mongoose.model("expiredToken", expiredTokenSchema);

module.exports = expiredToken;
