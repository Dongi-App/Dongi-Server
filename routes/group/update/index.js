const {
  findOne,
  updateDocument,
  checkMembership,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().required(),
});

const updateGroup = async (req, res) => {
  const { name, id } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check membership
    await checkMembership(id, req.user.email);

    // update group
    const group = await updateDocument("group", { _id: id }, { name });

    return res.status(200).send({ group: group.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = updateGroup;
