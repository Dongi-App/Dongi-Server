const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const Joi = require("joi");
const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const updateUser = async (req, res) => {
  const { first_name, last_name, password } = req.body;
  try {
    await schema.validateAsync(req.body);

    const { user } = req;

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.password = password || user.password;

    await user.save();

    return res.status(200).send({ user: user.serializer() });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = updateUser;
