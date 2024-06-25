const mongoose = require("mongoose");
const schemaType = require("../../types");

const expenseSchema = new mongoose.Schema({
  group: {
    type: schemaType.TypeString,
    required: true,
  },
  payer: {
    type: schemaType.TypeString,
    required: true,
  },
  description: {
    type: schemaType.TypeString,
    required: true,
  },
  amount: {
    type: schemaType.TypeDecimal,
    required: true,
  },
  total_shares: {
    type: schemaType.TypeNumber,
    required: true,
  },
  date: {
    type: schemaType.TypeDate,
    required: true,
  },
});

expenseSchema.method("serializer", function () {
  return {
    group: this.group,
    payer: this.payer,
    description: this.description,
    amount: +this.amount,
    total_shares: +this.total_shares,
    date: new Date(this.date).toISOString().split('T')[0]
  };
});

module.exports = expenseSchema;
