// SurveyLikesController.js
const models = require("../models");

const getLikesBySurveyId = (req, res) => {
  const surveyId = parseInt(req.params.surveyId, 10);
  models.surveyLike
    .getLikesBySurveyId(surveyId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const likeSurvey = (req, res) => {
  const { surveyId } = req.params;
  const { userId } = req.body;

  models.surveyLike
    .like(surveyId, userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const unlikeSurvey = (req, res) => {
  const { surveyId } = req.params;
  const { userId } = req.body;
  models.surveyLike
    .unlike(surveyId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getLikesBySurveyId,
  likeSurvey,
  unlikeSurvey,
};
