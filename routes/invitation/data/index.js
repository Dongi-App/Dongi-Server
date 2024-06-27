const { findOne, find } = require("../../../helpers");
const { boolSerializer } = require("../../../utils");
const Joi = require("joi");

const schema = Joi.object({
  invitation_id: Joi.string().required(),
});

const listInvitation = async (req, res) => {
  let { invitation_id } = req.query;
  try {
    await schema.validateAsync(req.query);

    let invitation = await findOne("invitation", { _id: invitation_id });
    if (
      !invitation ||
      (invitation.from !== req.user.email && invitation.to !== req.user.email)
    ) {
      throw new Error("can't access expense");
    }

    invitation = invitation.serializer();
    const group = await findOne("group", { _id: invitation.group });
    invitation.group = group.serializer();

    return res.status(200).send({ invitation });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = listInvitation;
