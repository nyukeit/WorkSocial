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
  // const { Title, Content, Visibility, Option1, Option2, Option3, Option4 } =
  //   req.body;
  // console.info(req.body);

  const survey = req.body;
  // const hasNewImage = req.file !== undefined;
  // const updatedSurvey = {
  //   Title,
  //   Content,
  //   Visibility,
  //   Option1,
  //   Option2,
  //   Option3,
  //   Option4,
  //   Survey_ID: req.params.id,
  // };

  // if (hasNewImage) {
  //   updatedSurvey.Image = req.file.filename;
  models.survey
    .update(survey)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  // } else {
  //   models.survey
  //     .updateWOImage(updatedSurvey)
  //     .then(() => {
  //       res.sendStatus(204);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // }
  // console.info(updatedSurvey);
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
