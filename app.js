const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems")); // if not already added, you must add this

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use("/", mainRouter);
// Handle non-existent routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
