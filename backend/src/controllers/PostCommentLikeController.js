// PostCommentLikeController.js
const PostCommentLikeManager = require("../models/Manager/PostCommentLikeManager");

const PostCommentLikeController = {
  likeComment: (req, res) => {
    const like = {
      Comment_ID: req.params.commentId,
      User_ID: req.body.User_ID,
    };

    PostCommentLikeManager.insert(like)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  unlikeComment: (req, res) => {
    const { likeId } = req.params;

    PostCommentLikeManager.delete(likeId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};

module.exports = PostCommentLikeController;
