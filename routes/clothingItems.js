const router = require("express").Router();

const { validateItemBody, validateId } = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

router.get("/", getItems);
router.post("/", auth, validateItemBody, createItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
