// SurveyController.js
const SurveyManager = require("../models/Manager/SurveyManager");

const getSurveys = (req, res) => {
  SurveyManager.findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSurveyByID = (req, res) => {
  SurveyManager.find(req.params.id)
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
  const { Option1, Option2, Option3, Option4 } = req.body;

  // Ensure at least Option1 and Option2 are provided
  if (!Option1 || !Option2) {
    res.status(400).send("Option1 and Option2 are mandatory.");
    return;
  }

  const options = [Option1, Option2, Option3, Option4];

  SurveyManager.createSurvey(options)
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

  SurveyManager.update(survey)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSurvey = (req, res) => {
  SurveyManager.delete(req.params.id)
    .then(() => {
      res.sendStatus(204);
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
