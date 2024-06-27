const {
  insertNewDocument,
  checkMembership,
  findOne,
  checkExpenseOwnership,
  updateDocument,
  deleteDocument,
  find,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  expense_id: Joi.string().required(),
  payer: Joi.string().email(),
  description: Joi.string().max(100),
  amount: Joi.number().greater(0).not(0),
  date: Joi.date().less(Date.now()),
  shares: Joi.array().items(
    Joi.object({
      user: Joi.string().email().required(),
      share: Joi.number().required().min(0),
    })
  ),
});

const updateExpense = async (req, res) => {
  const { expense_id, payer, description, amount, date, shares } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check expense membership and get needed objects
    const [expense, group] = await checkExpenseOwnership(
      expense_id,
      req.user.email
    );
    // check payer membership and update
    if (payer) {
      await checkMembership(group._id, payer);
      expense.payer = payer;
    }
    // check shares membership and update them
    for (const share of shares) {
      await checkMembership(group._id, share.user);
      const old_share = await findOne("share", {
        expense: expense_id,
        user: share.user,
      });
      if (old_share) {
        expense.total_shares =
          expense.total_shares - old_share.share + share.share;

        if (share.share === 0) {
          await deleteDocument("share", { _id: old_share._id });
        } else {
          await updateDocument(
            "share",
            { _id: old_share._id },
            { share: share.share }
          );
        }
      } else if (share.share !== 0) {
        expense.total_shares = expense.total_shares + share.share;

        await insertNewDocument("share", {
          expense: expense_id,
          user: share.user,
          share: share.share,
        });
      }
    }

    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    let response = { expense: expense.serializer() };
    if (expense.total_shares !== 0) {
      // update expense
      await updateDocument(
        "expense",
        { _id: expense_id },
        {
          payer: expense.payer,
          description: expense.description,
          amount: expense.amount,
          total_shares: expense.total_shares,
          date: expense.date,
        }
      );

      // append shares to response
      const up_to_date_shares = await find("share", { expense: expense_id });
      response.expense.shares = up_to_date_shares.map((up_to_date_share) => {
        return up_to_date_share.serializer();
      });

      response.message = "expense updated";
    } else {
      // delete shares
      await deleteDocument("share", {
        expense: expense_id,
      });

      // delete expense
      await deleteDocument("expense", {
        _id: expense_id,
      });

      response.message = "expense deleted";
    }

    return res.status(200).send(response);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = updateExpense;
