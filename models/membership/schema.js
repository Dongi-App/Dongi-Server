const mongoose = require("mongoose");
const schemaType = require("../../types");

const membershipSchema = new mongoose.Schema({
  user: {
    type: schemaType.TypeString,
    required: true,
  },
  group: {
    type: schemaType.TypeString,
    required: true,
  },
});

module.exports = membershipSchema;
