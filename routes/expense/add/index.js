const { insertNewDocument, checkMembership } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  group: Joi.string().required(),
  payer: Joi.string().email().required(),
  description: Joi.string().required().max(100),
  amount: Joi.number().required().greater(0).not(0),
  date: Joi.date().required().less(Date.now()),
  shares: Joi.array()
    .items(
      Joi.object({
        user: Joi.string().email().required(),
        share: Joi.number().required().greater(0).not(0),
      })
    )
    .required(),
});

const addExpense = async (req, res) => {
  const { group, payer, description, amount, date, shares } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check expenseAdder membership
    await checkMembership(group, req.user.email);
    // check payer membership
    await checkMembership(group, payer);
    // check shares membership and calc total shares
    let totalShares = 0;
    for (const share of shares) {
      await checkMembership(group, share.user);
      totalShares += +share.share;
    }

    const response = {};
    // create expense
    const expenseObject = await insertNewDocument("expense", {
      group,
      payer,
      description,
      amount,
      total_shares: totalShares,
      date,
    });
    response.expense = expenseObject.serializer();

    response.expense.shares = [];
    // create shares
    for (const share of shares) {
      const shareObject = await insertNewDocument("share", {
        expense: expenseObject._id,
        user: share.user,
        share: share.share,
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
