const express = require("express");
const multer = require("multer");

const router = express.Router();

const userControllers = require("../controllers/userControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
} = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post(
  "/users",
  upload.single("profileImage"),
  hashPassword,
  userControllers.add
);
router.post("/login", userControllers.login, verifyPassword);

// router.use(verifyToken);

router.get("/users", verifyToken, userControllers.browse);
router.get("/users/:id", verifyToken, userControllers.read);
router.put("/users/:id", verifyId, userControllers.edit);
router.delete("/users/:id", verifyId, userControllers.destroy);

module.exports = router;
