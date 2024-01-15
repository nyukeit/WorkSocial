// PostCommentLikesController.js
const models = require("../models");

const getPostCommentLikes = (req, res) => {
  models.postCommentLikes
    .getPostCommentLikes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPostCommentLikesByID = (req, res) => {
  models.postCommentLikes
    .getPostCommentLikesByID(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
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

const createPostCommentLikes = (req, res) => {
  const postCommentLikes = req.body;

  // TODO: Ajouter des validations (longueur, format...)

  models.postCommentLikes
    .createPostCommentLikes(postCommentLikes)
    .then(([result]) => {
      res.location(`/postCommentLikes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePostCommentLikes = (req, res) => {
  const postCommentLikes = req.body;

  // TODO: Ajouter des validations (longueur, format...)

  postCommentLikes.id = parseInt(req.params.id, 10);

  models.postCommentLikes
    .updatePostCommentLikes(postCommentLikes.id, postCommentLikes)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deletePostCommentLikes = (req, res) => {
  models.postCommentLikes
    .deletePostCommentLikes(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getPostCommentLikes,
  getPostCommentLikesByID,
  createPostCommentLikes,
  updatePostCommentLikes,
  deletePostCommentLikes,
};
