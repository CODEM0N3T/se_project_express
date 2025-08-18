const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserUpdateBody } = require("../middlewares/validation");
const { getCurrentUser, updateUserProfile } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdateBody, updateUserProfile);

module.exports = router;
