const mongoose = require("mongoose");
const schemaType = require("../../types");

const shareSchema = new mongoose.Schema({
  expense: {
    type: schemaType.TypeString,
    required: true,
  },
  user: {
    type: schemaType.TypeString,
    required: true,
  },
  share: {
    type: schemaType.TypeNumber,
    required: true,
  },
});

shareSchema.method("serializer", function () {
  return {
    expense: this.expense,
    user: this.user,
    share: +this.share,
  };
});

module.exports = shareSchema;
