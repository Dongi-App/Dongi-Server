const mongoose = require("mongoose");
const expenseSchema = require("./schema");

const expense = mongoose.model("expense", expenseSchema);

module.exports = expense;
