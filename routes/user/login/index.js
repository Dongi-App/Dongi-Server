const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../../../config");
const { findOne } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await schema.validateAsync(req.body);
    const user = await findOne("user", { email });
    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        throw new Error("invalid email or password");
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.status(200).send({ user: user.serializer(), token });
    } else {
      throw new Error("invalid email or password");
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = loginUser;
