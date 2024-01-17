const models = require("../models");

const getPostComments = (req, res) => {
  const postID = parseInt(req.params.postID, 10);
  models.postComments
    .findByPostId(postID)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPostCommentByID = (req, res) => {
  const commentID = parseInt(req.params.id, 10);

  models.postComments
    .findByPK(commentID)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createPostComment = (req, res) => {
  const postComment = req.body.comment;
  const postId = parseInt(req.params.postID, 10);
  const userID = req.User_ID;

  if (!postComment) {
    res.status(400).send("Missing comment");
    return;
  }

  models.postComments
    .insert(postId, userID, postComment)
    .then(([result]) => {
      res
        .location(`/posts/${postComment.Post_ID}/comments/${result.insertId}`)
        .status(201)
        .send("Comment created");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePostComment = (req, res) => {
  const commentID = parseInt(req.params.id, 10);
  const comment = req.body;

  models.postComments
    .update(commentID, comment)
    .then(() => {
      res.status(204).send("Comment updated");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deletePostComment = (req, res) => {
  const commentID = parseInt(req.params.id, 10);

  models.postComments
    .delete(commentID)
    .then(() => {
      res.status(204).send("Comment deleted");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getPostComments,
  getPostCommentByID,
  createPostComment,
  updatePostComment,
  deletePostComment,
};
