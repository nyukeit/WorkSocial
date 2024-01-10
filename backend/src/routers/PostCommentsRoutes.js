const express = require("express");

const router = express.Router();
const PostCommentLikeController = require("../controllers/PostCommentLikeController");

// Route pour liker un commentaire
router.post(
  "/posts/comments/:commentId/likes",
  PostCommentLikeController.likeComment
);

// Route pour retirer un like d'un commentaire
router.delete(
  "/posts/comments/likes/:likeId",
  PostCommentLikeController.unlikeComment
);

module.exports = router;
