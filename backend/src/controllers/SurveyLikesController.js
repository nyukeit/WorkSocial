// SurveyLikesController.js
const models = require("../models");

const getSurveyLikes = (req, res) => {
  models.surveyLikes
    .getSurveyLikes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSurveyLikesByID = (req, res) => {
  models.surveyLikes
    .getSurveyLikesByID(req.params.id)
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

const createSurveyLikes = (req, res) => {
  const surveyLikes = req.body;

  // TODO: Add validations (length, format...)

  models.surveyLikes
    .createSurveyLikes(surveyLikes)
    .then(([result]) => {
      res.location(`/surveyLikes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSurveyLikes = (req, res) => {
  const surveyLikes = req.body;

  // TODO: Add validations (length, format...)

  surveyLikes.id = parseInt(req.params.id, 10);

  models.surveyLikes
    .updateSurveyLikes(surveyLikes.id, surveyLikes)
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

const deleteSurveyLikes = (req, res) => {
  models.surveyLikes
    .deleteSurveyLikes(req.params.id)
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
  getSurveyLikes,
  getSurveyLikesByID,
  createSurveyLikes,
  updateSurveyLikes,
  deleteSurveyLikes,
};
