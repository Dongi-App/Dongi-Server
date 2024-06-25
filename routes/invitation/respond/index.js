const {
  insertNewDocument,
  findOne,
  deleteDocument,
} = require("../../../helpers");
const { boolSerializer } = require("../../../utils");
const Joi = require("joi");

const schema = Joi.object({
  invitation_id: Joi.string().required(),
  admit: Joi.bool().required(),
});

const respondInvitation = async (req, res) => {
  let { invitation_id, admit } = req.body;

  try {
    await schema.validateAsync(req.body);
    admit = boolSerializer(admit);

    // check invitation
    const invitation = await findOne("invitation", {
      _id: invitation_id,
      to: req.user.email,
    });
    if (!invitation) {
      throw new Error("invitation not found");
    }

    const response = {
      invitation: invitation.serializer(),
    };
    if (admit) {
      // create membership
      await insertNewDocument("membership", {
        group: invitation.group,
        user: invitation.to,
      });

      response.invitation.admitted = true;
    } else {
      response.invitation.admitted = false;
    }

    await deleteDocument("invitation", { _id: invitation._id });

    return res.status(200).send(response);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = respondInvitation;
