const express = require("express");

const router = express.Router();
const upload = require("../middleware/handleUpload");
const PostController = require("../controllers/PostController");

const { verifyToken } = require("../middleware/auth");
// const verifyOwner = require("../middleware/verifyOwner");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all posts
router.get("/posts", PostController.getPosts);

// Get a specific post by ID
router.get("/posts/:id", PostController.getPostById);

// Create a new post
router.post("/posts", upload.single("Image"), PostController.createPost);

// Update an existing post
router.put("/posts/:id", upload.single("Image"), PostController.updatePost);

// Delete a post
router.delete("/posts/:id", PostController.deletePost);

module.exports = router;
