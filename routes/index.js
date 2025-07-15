const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use(auth);
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
