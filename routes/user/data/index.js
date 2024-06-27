const { findOne } = require("../../../helpers");

const dataUser = async (req, res) => {
  try {
    const user = await findOne("user", { email: req.user.email });
    return res.status(200).send({ user: user.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = dataUser;
