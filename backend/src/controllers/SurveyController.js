const models = require("../models");

const getSurveys = (req, res) => {
  models.survey
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSurveyByID = (req, res) => {
  models.survey
    .findByPK(req.params.id)
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

const createSurvey = (req, res) => {
  const survey = req.body;
  const userID = req.User_ID;

  if (req.file) {
    survey.Image = req.file.filename;
  }

  console.info(survey);
  models.survey
    .insert(survey, userID)
    .then(([result]) => {
      res.location(`/surveys/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSurvey = (req, res) => {
  const survey = req.body;
  survey.id = parseInt(req.params.id, 10);

  models.survey
    .update(survey)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSurvey = (req, res) => {
  models.survey
    .delete(req.params.id)
    .then(() => {
      res.status(204).send("Successfully deleted Survey");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getSurveys,
  getSurveyByID,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
