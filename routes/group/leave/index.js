const {
  findOne,
  deleteDocument,
  checkMembership,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
});

const leaveGroup = async (req, res) => {
  const { id } = req.body;
  try {
    await schema.validateAsync(req.body);

    // check membership
    await checkMembership(id, req.user.email);

    // delete membership
    await deleteDocument("membership", { _id: membership._id });

    // delete group if all members leave
    const allGroupMembers = await findOne("membership", {
      group: id,
    });
    if (!allGroupMembers) {
      await deleteDocument("group", { _id: id });
    }

    return res.status(200).send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = leaveGroup;
