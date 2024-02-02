const models = require("../models");

const getVotesBySurveyId = (req, res) => {
  const surveyId = parseInt(req.params.surveyId, 10);
  models.surveyVote
    .getVotesBySurveyId(surveyId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const castVote = (req, res) => {
  const surveyId = parseInt(req.params.surveyId, 10);
  const { userId, votedOption } = req.body;
  console.info(votedOption);

  models.surveyVote
    .castVote(surveyId, userId, votedOption)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  castVote,
  getVotesBySurveyId,
};
