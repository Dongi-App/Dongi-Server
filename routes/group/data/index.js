const { findOne, checkMembership, find } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
});

const dataGroup = async (req, res) => {
  const { id } = req.query;
  try {
    await schema.validateAsync(req.query);

    await checkMembership(id, req.user.email);

    let group = await findOne("group", { _id: id });
    group = group.serializer();

    const memberships = await find("membership", { group: id });
    const members = [];
    for (const membership of memberships) {
      const member = await findOne("user", { email: membership.user });
      members.push(member.serializer());
    }
    group.members = members;

    return res.status(200).send({ group });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = dataGroup;
// TODO: add members
