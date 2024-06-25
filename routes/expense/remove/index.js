const { checkExpenseOwnership, deleteDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  expense_id: Joi.string().required(),
});

const removeExpense = async (req, res) => {
  const { expense_id } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check if expense belongs to one of user's group
    await checkExpenseOwnership(expense_id, req.user.email);

    // delete shares
    await deleteDocument("share", {
      expense: expense_id,
    });

    // delete expense
    await deleteDocument("expense", {
      _id: expense_id,
    });

    return res.status(200).send({ message: "expense deleted" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = removeExpense;
