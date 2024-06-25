const mongoose = require("mongoose");
const invitationSchema = require("./schema");

const invitation = mongoose.model("invitation", invitationSchema);

module.exports = invitation;
