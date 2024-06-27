const { findOne, find } = require("../../../helpers");

const listGroup = async (req, res) => {
  try {
    const memberships = await find("membership", { user: req.user.email });
    const groups = [];
    for (const membership of memberships) {
      const group = await findOne("group", { _id: membership.group });
      groups.push(group.serializer());
    }
    return res.status(200).send({ groups });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = listGroup;
