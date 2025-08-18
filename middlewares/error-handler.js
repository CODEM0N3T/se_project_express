// middlewares/error-handler.js
const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  let status = err.statusCode || INTERNAL_SERVER_ERROR;
  let message = err.message || "An unexpected error occurred";

  console.error(err);
  res.status(status).send({ message });
};
