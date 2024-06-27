const { findOne, find } = require("../../../helpers");
const { boolSerializer } = require("../../../utils");
const Joi = require("joi");

const schema = Joi.object({
  incoming: Joi.bool().required(),
});

const listInvitation = async (req, res) => {
  let { incoming } = req.query;
  try {
    await schema.validateAsync(req.query);
    incoming = boolSerializer(incoming);

    let findQuery;
    if (incoming) {
      findQuery = { to: req.user.email };
    } else {
      findQuery = { from: req.user.email };
    }

    let invitations = await find("invitation", findQuery);
    invitations = invitations.map((invitation) => invitation.serializer());

    for (const invitation of invitations) {
      const group = await findOne("group", { _id: invitation.group });
      invitation.group = group.serializer();
    }
    return res.status(200).send({ invitations });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = listInvitation;
