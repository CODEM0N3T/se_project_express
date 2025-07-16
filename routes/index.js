const router = require("express").Router();

const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", itemRoutes);
router.use("/users", userRoutes);
router.use(auth);

module.exports = router;
