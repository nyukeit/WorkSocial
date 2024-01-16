const express = require("express");

const router = express.Router();
const PostController = require("../controllers/PostController");

const { verifyToken } = require("../middleware/auth");
const verifyOwner = require("../middleware/verifyOwner");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all posts
router.get("/posts", PostController.getPosts);

// Get a specific post by ID
router.get("/posts/:id", PostController.getPostById);

// Create a new post
router.post("/posts", /* upload.single("image") */ PostController.createPost);

// Update an existing post
router.put("/posts/:id", verifyOwner, PostController.updatePost);

// Delete a post
router.delete("/posts/:id", verifyOwner, PostController.deletePost);

module.exports = router;
