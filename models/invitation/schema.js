const mongoose = require("mongoose");
const schemaType = require("../../types");

const invitationSchema = new mongoose.Schema({
  from: {
    type: schemaType.TypeString,
    required: true,
  },
  to: {
    type: schemaType.TypeString,
    required: true,
  },
  group: {
    type: schemaType.TypeString,
    required: true,
  },
});

invitationSchema.method("serializer", function () {
  return {
    from: this.from,
    to: this.to,
    group: this.group,
    id: this._id.toString(),
  };
});

module.exports = invitationSchema;
