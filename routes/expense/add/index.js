const {
  insertNewDocument,
  checkMembership,
  find,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  group: Joi.string().required(),
  payer: Joi.string().email().required(),
  description: Joi.string().required().max(100),
  amount: Joi.number().required().greater(0).not(0),
  date: Joi.date().required().less(Date.now()),
});

const addExpense = async (req, res) => {
  const { group, payer, description, amount, date } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check expenseAdder membership
    await checkMembership(group, req.user.email);
    // check payer membership
    await checkMembership(group, payer);

    const members = await find("membership", { group });

    const response = {};
    // create expense
    const expenseObject = await insertNewDocument("expense", {
      group,
      payer,
      description,
      amount,
      total_shares: members.length,
      date,
    });
    response.expense = expenseObject.serializer();

    response.expense.shares = [];
    // create shares
    for (const member of members) {
      const shareObject = await insertNewDocument("share", {
        expense: expenseObject._id,
        user: member.user,
        share: 1,
      });
      response.expense.shares.push(shareObject.serializer());
    }

    return res.status(200).send(response);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = addExpense;
