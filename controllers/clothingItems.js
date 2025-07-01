const Item = require("../models/clothingItem");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) return res.status(404).send({ message: "Item not found" });
      res.send(item);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
