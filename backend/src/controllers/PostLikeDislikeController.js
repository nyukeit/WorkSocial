const models = require("../models");

const getLikesByPostId = (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  models.postLike
    .getLikesByPostId(postId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const likePost = (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  models.postLike
    .like(postId, userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const unlikePost = (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  models.postLike
    .unlike(postId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getLikesByPostId,
  likePost,
  unlikePost,
};
