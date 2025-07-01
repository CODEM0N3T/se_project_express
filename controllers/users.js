const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};

// const getUser = (req, res) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (!user) return res.status(404).send({ message: "User not found" });
//       res.send(user);
//     })
//     .catch((err) => res.status(500).send({ message: err.message }));
// };

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module, (exports = { getUsers, createUser });
