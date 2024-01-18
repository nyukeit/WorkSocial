const express = require("express");

const router = express.Router();
const EventCommentLikes = require("../controllers/EventCommentsLikesController");

const { verifyToken } = require("../middleware/auth");

router.use(verifyToken);

router.get(
  "/events/:eventID/comments/:commentID/likes",
  EventCommentLikes.getEventCommentsLikes
);

router.post(
  "/events/:eventID/comments/:commentID/likes",
  EventCommentLikes.likeComment
);

router.delete(
  "/events/:eventID/comments/:commentID/likes/:likeID",
  EventCommentLikes.unlikeComment
);

module.exports = router;
