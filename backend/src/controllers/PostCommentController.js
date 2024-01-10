// PostCommentController.js
const PostCommentManager = require("../models/Manager/PostCommentManager");

const PostCommentController = {
  getAllCommentsForPost: (req, res) => {
    const { postId } = req.params;

    PostCommentManager.findByPostId(postId)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  createCommentForPost: (req, res) => {
    const comment = {
      Post_ID: req.params.postId,
      User_ID: req.body.User_ID,
      Comment: req.body.Comment,
    };

    PostCommentManager.insert(comment)
      .then(([result]) => {
        res
          .location(`/posts/${comment.Post_ID}/comments/${result.insertId}`)
          .sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  deleteComment: (req, res) => {
    const { commentId } = req.params;

    PostCommentManager.delete(commentId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};

module.exports = PostCommentController;
