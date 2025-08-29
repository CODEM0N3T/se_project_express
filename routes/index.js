const router = require("express").Router();

const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthBody,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthBody, login);

router.use("/items", itemRoutes);

router.use(auth);
router.use("/users", userRoutes);

module.exports = router;
