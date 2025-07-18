const router = require("express").Router();

const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", itemRoutes);
router.get("/items", getItems);

router.use(auth);
router.use("/users", userRoutes);
module.exports = router;
