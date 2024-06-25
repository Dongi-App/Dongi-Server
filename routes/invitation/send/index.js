const {
  insertNewDocument,
  findOne,
} = require("../../../helpers");
const { emailSerializer } = require("../../../utils");
const Joi = require("joi");

const schema = Joi.object({
  user_email: Joi.string().email().required(),
  group_id: Joi.string().required(),
});

const sendInvitation = async (req, res) => {
  let { user_email, group_id } = req.body;
  
  try {
    await schema.validateAsync(req.body);
    user_email = emailSerializer(user_email);

    // check from membership
    const fromMembership = await findOne("membership", {
      group: group_id,
      user: req.user.email,
    });
    if (!fromMembership) {
      throw new Error("you are not a member of this group");
    }

    // check self request
    if (user_email == req.user.email) {
      throw new Error("you cannot send a request to yourself");
    }

    // check to membership
    const toMembership = await findOne("membership", {
      group: group_id,
      user: user_email,
    });
    if (toMembership) {
      throw new Error("already a member of this group");
    }

    // check invitation
    let invitation = await findOne("invitation", {
      group: group_id,
      from: req.user.email,
      to: user_email,
    });
    if (invitation) {
      throw new Error("duplicated invitation request");
    }

    // create invitation
    invitation = await insertNewDocument("invitation", {
      group: group_id,
      from: req.user.email,
      to: user_email,
    });

    return res.status(200).send({ invitation: invitation.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = sendInvitation;
