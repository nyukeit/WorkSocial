const models = require("../models");

const getEventCommentsLikes = (req, res) => {
  const commentID = parseInt(req.params.commentID, 10);

  models.eventCommentsLikes
    .findByEventCommentID(commentID)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const unlikeComment = (req, res) => {
  const { likeId } = req.params;

  models.eventCommentsLikes
    .delete(likeId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const likeComment = (req, res) => {
  const { likeId } = req.params;

  models.eventCommentsLikes
    .insert(likeId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getEventCommentsLikes,
  unlikeComment,
  likeComment,
};
