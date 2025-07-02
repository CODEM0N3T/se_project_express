const Item = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

module.exports.likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => Promise.reject(new Error("NotFound")))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => Promise.reject(new Error("NotFound")))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message })
    );
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

module.exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (!item) return res.status(404).send({ message: "Item not found" });
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};
