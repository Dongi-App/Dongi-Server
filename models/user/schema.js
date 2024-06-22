const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: schemaType.TypeString,
      required: true,
    },
    last_name: {
      type: schemaType.TypeString,
      required: true,
    },
    username: {
      type: schemaType.TypeString,
      required: true,
    },
    email: {
      type: schemaType.TypeString,
      required: true,
      unique: true,
    },
    password: {
      type: schemaType.TypeString,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.method("serializer", function () {
  return {
    first_name: this.first_name,
    last_name: this.last_name,
    username: this.username,
    email: this.email,
  };
});

module.exports = userSchema;
