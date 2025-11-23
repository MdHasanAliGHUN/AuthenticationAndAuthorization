const jwt = require("jsonwebtoken");
const moment = require("moment");
const generateToken = async (userId,role,expires,type,secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    role: role,
    iat: moment().unix(),
    exp: expires.unix(),
    type: type,
  };
  return jwt.sign(payload, secret);
};
module.exports = { generateToken };
