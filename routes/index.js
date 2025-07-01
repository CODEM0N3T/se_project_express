const router = require("express").Router();
const userRoutes = require("./users");
// const itemRoutes = require("./clothingItems");

router.use("/users", userRoutes);
// router.use("/items", itemRoutes);

module.exports = router;
