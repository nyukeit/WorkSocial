const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
} = require("../middleware/auth");

router.post("/users", hashPassword, userControllers.add);
router.post("/users/login", userControllers.login, verifyPassword);

// router.use(verifyToken);

router.get("/users", verifyToken, userControllers.browse);
router.get("/users/:id", verifyToken, userControllers.read);
router.put("/users/:id", verifyId, userControllers.edit);
router.delete("/users/:id", verifyId, userControllers.destroy);

module.exports = router;
