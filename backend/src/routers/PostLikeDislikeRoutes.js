const express = require("express");

const router = express.Router();

const PostLikeController = require("../controllers/PostLikeDislikeController");

router.post("/posts/:postId/likes", PostLikeController.likePost);
router.delete("/posts/:postId/likes/:userId", PostLikeController.unlikePost);

module.exports = router;
