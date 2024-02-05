const express = require("express");
const multer = require("multer");

const router = express.Router();

const userControllers = require("../controllers/UserControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  blacklistToken,
} = require("../middleware/auth");

const verifyOwner = require("../middleware/verifyOwner");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new user
router.post(
  "/users",
  upload.single("ProfileImage"),
  hashPassword,
  userControllers.createUser
);

router.post(
  "/users/checkOldPassword",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
// Login
router.post("/login", userControllers.login, verifyPassword);

// verify username
router.get("/verify-username", userControllers.verifyUsernameAvailability);
router.get("/verify-email", userControllers.verifyEmailAvailability);
router.get("/verify-Phone", userControllers.verifyPhoneAvailability);

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all users
router.get("/users", verifyToken, userControllers.getUsers);

// Get a specific user by ID
router.get("/users/:id", verifyToken, userControllers.getUserByID);

// Update an existing user
router.put("/users/:id", verifyOwner, hashPassword, userControllers.updateUser);
router.put("/updatePassword/:id", hashPassword, userControllers.updatePassword);
router.get("/logout", userControllers.logout, blacklistToken);

// Delete a user
router.delete("/users/:id", verifyOwner, userControllers.deleteUser);

module.exports = router;
