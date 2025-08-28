// middlewares/error-handler.js
const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  const status = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    status === INTERNAL_SERVER_ERROR
      ? "An error has occurred on the server"
      : err.message || "An unexpected error occurred";

  console.error(err);
  res.status(status).send({ message });
};
