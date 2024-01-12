const express = require("express");

const router = express.Router();
const eventCommentLikeController = require("../controllers/eventCommentLikeConstroller");

router.get(
  "/events/:eventID/commentsLikes",
  eventCommentLikeController.getCommentLikes
);

router.post(
  "/events/:eventID/commentsLikes",
  eventCommentLikeController.createCommentLike
);

router.delete(
  "/events/:eventID/commentsLikes/:LikeID",
  eventCommentLikeController.deleteCommentLike
);

module.exports = router;
