const { findOne, deleteDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
});

const removeGroup = async (req, res) => {
  const { id } = req.body;
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

    // delete all memberships
    await deleteDocument("membership", { group: id });

    // delete group
    await deleteDocument("group", { _id: id });

    return res.status(200).send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = removeGroup;
