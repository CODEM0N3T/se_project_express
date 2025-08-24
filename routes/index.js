const router = require("express").Router();

const auth = require("../middlewares/auth");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

// router.get("/crash-test", (req, res) => {
//   setTimeout(() => {
//     throw new Error("Server will crash now");
//   }, 0);
// });

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", itemRoutes);

router.use(auth);
router.use("/users", userRoutes);

module.exports = router;
