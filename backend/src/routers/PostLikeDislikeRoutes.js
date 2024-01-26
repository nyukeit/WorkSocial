const express = require("express");

const router = express.Router();

const PostLikeController = require("../controllers/PostLikeDislikeController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/posts/:postId/likes", PostLikeController.getLikesByPostId);
router.post("/posts/:postId/likes", PostLikeController.likePost);
router.delete("/posts/:postId/likes", PostLikeController.unlikePost);

module.exports = router;
