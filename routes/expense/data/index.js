const { checkExpenseOwnership, find } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  expense_id: Joi.string().required(),
});

const dataExpense = async (req, res) => {
  const { expense_id } = req.query;
  try {
    await schema.validateAsync(req.query);

    // check expense membership and get needed objects
    let [expense, _] = await checkExpenseOwnership(
      expense_id,
      req.user.email
    );
    expense = expense.serializer()

    const shares = await find("share", { expense: expense_id });
    expense.shares = shares.map((share) => share.serializer());

    return res.status(200).send({ expense });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = dataExpense;
