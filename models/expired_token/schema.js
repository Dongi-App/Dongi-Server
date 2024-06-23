const mongoose = require("mongoose");
const schemaType = require("../../types");

const expiredTokenSchema = new mongoose.Schema(
  {
    token: {
      type: schemaType.TypeString,
      required: true,
    },
  },
);

module.exports = expiredTokenSchema;
