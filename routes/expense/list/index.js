const { findOne, checkMembership, find } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  group_id: Joi.string().required(),
});

const dataGroup = async (req, res) => {
  const { group_id } = req.query;
  try {
    await schema.validateAsync(req.query);

    await checkMembership(group_id, req.user.email);

    let expenses = await find("expense", { group: group_id });
    expenses = expenses.map((expense) => expense.serializer());

    return res.status(200).send({ expenses });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = dataGroup;
