const models = require("../models");

const getCommentLikes = (req, res) => {
  const { commentID } = req.params;

  models.eventCommentLike
    .findByCommentId(commentID)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createCommentLike = (req, res) => {
  const like = {
    Comment_ID: req.params.commentID,
    User_ID: req.body.User_ID,
    Liked_At: req.body.Liked_At || new Date().toISOString(),
  };

  models.eventCommentLike
    .insert(like)
    .then(([result]) => {
      res
        .location(`/comments/${like.Comment_ID}/likes/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteCommentLike = (req, res) => {
  const { likeID } = req.params;

  models.eventCommentLike
    .delete(likeID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getCommentLikes,
  createCommentLike,
  deleteCommentLike,
};
