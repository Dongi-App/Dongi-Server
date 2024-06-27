const { findOne, checkMembership } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
});

const dataGroup = async (req, res) => {
  const { id } = req.query;
  try {
    await schema.validateAsync(req.query);

    await checkMembership(id, req.user.email);

    const group = await findOne("group", { _id: id });

    return res.status(200).send({ group: group.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = dataGroup;
