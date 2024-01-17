const express = require("express");
const multer = require("multer");

const router = express.Router();

const userControllers = require("../controllers/UserControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
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

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all users
router.get("/users", verifyToken, userControllers.getUsers);

// Get a specific user by ID
router.get("/users/:id", verifyToken, userControllers.getUserByID);

// Update an existing user
router.put("/users/:id", verifyOwner, userControllers.updateUser);

// Delete a user
router.delete("/users/:id", verifyOwner, userControllers.deleteUser);

module.exports = router;
