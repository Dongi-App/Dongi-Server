const { findOne, updateDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().required(),
});

const addGroup = async (req, res) => {
  const { name, id } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check membership
    const membership = await findOne("membership", {
      group: id,
      user: req.user._id,
    });
    if (!membership) {
      throw new Error("you are not a member of this group");
    }

    // update group
    const group = await updateDocument("group", { _id: id }, { name });

    return res.status(200).send({ group: group.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = addGroup;
