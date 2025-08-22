require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors: celebrateErrors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

// const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(requestLogger);

app.use("/", mainRouter);

// Handle non-existent routes
app.use((req, res, next) => {
  const { NotFoundError } = require("./utils/custom-errors");
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(celebrateErrors());
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
