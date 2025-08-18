// middlewares/logger.js
const winston = require("winston");
const expressWinston = require("express-winston");

// ----- Request Logger -----
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: "request.log" }), // log to file
  ],
  format: winston.format.json(),
});

// ----- Error Logger -----
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: "error.log" }), // log to error.log
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
