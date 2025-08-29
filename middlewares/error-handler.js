// middlewares/error-handler.js

module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message =
    status === 500
      ? "An error has occurred on the server"
      : err.message || "An unexpected error occurred";

  console.error(err);
  res.status(status).send({ message });
};
