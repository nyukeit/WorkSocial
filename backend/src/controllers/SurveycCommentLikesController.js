// SurveycCommentLikesController.js
const models = require("../models");

const getSurveycCommentLikes = (req, res) => {
  models.surveycCommentLikes
    .getSurveycCommentLikes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSurveycCommentLikesByID = (req, res) => {
  models.surveycCommentLikes
    .getSurveycCommentLikesByID(req.params.id)
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

const createSurveycCommentLikes = (req, res) => {
  const surveycCommentLikes = req.body;

  // TODO: Ajouter des validations (longueur, format...)

  models.surveycCommentLikes
    .createSurveycCommentLikes(surveycCommentLikes)
    .then(([result]) => {
      res.location(`/surveycCommentLikes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSurveycCommentLikes = (req, res) => {
  const surveycCommentLikes = req.body;

  // TODO: Ajouter des validations (longueur, format...)

  surveycCommentLikes.id = parseInt(req.params.id, 10);

  models.surveycCommentLikes
    .updateSurveycCommentLikes(surveycCommentLikes.id, surveycCommentLikes)
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

const deleteSurveycCommentLikes = (req, res) => {
  models.surveycCommentLikes
    .deleteSurveycCommentLikes(req.params.id)
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
  getSurveycCommentLikes,
  getSurveycCommentLikesByID,
  createSurveycCommentLikes,
  updateSurveycCommentLikes,
  deleteSurveycCommentLikes,
};
