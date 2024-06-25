const mongoose = require("mongoose");
const schemaType = require("../../types");

const shareSchema = new mongoose.Schema({
  group: {
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
    group: this.group,
    user: this.user,
    share: +this.share,
  };
});

module.exports = shareSchema;
