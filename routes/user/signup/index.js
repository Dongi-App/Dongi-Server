const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../../../config");
const { insertNewDocument, findOne } = require("../../../helpers");
const { emailSerializer } = require("../../../utils");
const Joi = require("joi");
const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

const signUpUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    await schema.validateAsync(req.body);
    email = emailSerializer(email);

    const check_user_exist_by_email = await findOne("user", { email });
    if (check_user_exist_by_email) {
      throw new Error("email already exist");
    }

    const new_user = {
      ...req.body,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    };
    const user = await insertNewDocument("user", new_user);
    let token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.status(200).send({ user: user.serializer(), token });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: e.message });
  }
};

module.exports = signUpUser;
