const mongoose = require("mongoose");
const schemaType = require("../../types");

const groupSchema = new mongoose.Schema({
  name: {
    type: schemaType.TypeString,
    required: true,
  },
});

groupSchema.method("serializer", function () {
  return {
    name: this.name,
    id: this._id.toString(),
  };
});

module.exports = groupSchema;
