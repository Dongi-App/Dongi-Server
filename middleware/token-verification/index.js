const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const { findOne } = require("../../helpers");

const tokenVerification = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    throw new Error("token is not provided");
  }

  jwt
    .verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new Error("token unauthorized");
      }
      const is_token_expired = !!(await findOne("expiredToken", { token }));
      if(is_token_expired) {
        throw new Error("expired token");
      }

      const user = await findOne("user", { _id: decoded.id });
      if (!user) {
        throw new Error("user not found");
      }
      req.user = user;
      next();
    })
    .catch((e) => {
      console.log(e)
      return res.status(400).send({ message: e.message });
    });
};

module.exports = { tokenVerification: tokenVerification };
