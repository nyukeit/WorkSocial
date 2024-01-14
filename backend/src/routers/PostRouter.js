const express = require("express");

const router = express.Router();
const PostController = require("../controllers/PostController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getPostById);
// router.post("/posts", upload.single("image"), PostController.createPost);
router.put("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);

module.exports = router;
