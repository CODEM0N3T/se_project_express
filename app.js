const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;

const app = express();

// Middleware to parse JSON

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Use routes
app.use(express.json());
app.use("/", mainRouter);

// Handle non-existent routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
