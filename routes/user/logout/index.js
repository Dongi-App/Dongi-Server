const { insertNewDocument } = require("../../../helpers");

const logoutUser = async (req, res) => {
  try {
    const token = req.headers["token"];
    await insertNewDocument("expiredToken", { token });
    return res.status(200).send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = logoutUser;
