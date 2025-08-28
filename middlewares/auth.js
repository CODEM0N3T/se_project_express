const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !/^Bearer\s+/i.test(authorization)) {
    return next(new UNAUTHORIZED("Authorization required"));
  }

  const token = authorization.replace(/^Bearer\s+/i, "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UNAUTHORIZED("Invalid token"));
  }
};
