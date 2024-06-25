const { insertNewDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
});

const addGroup = async (req, res) => {
  const { name } = req.body;
  try {
    await schema.validateAsync(req.body);

    const group = await insertNewDocument("group", { name });
    await insertNewDocument("membership", {
      group: group._id.toString(),
      user: req.user.email,
    });

    return res.status(200).send({ group: group.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = addGroup;
