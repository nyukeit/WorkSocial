const models = require("../models");

const getSurveyComments = (req, res) => {
  const surveyID = parseInt(req.params.surveyID, 10);

  models.surveyComments
    .findBySurveyId(surveyID)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSurveyCommentByID = (req, res) => {
  const commentID = parseInt(req.params.id, 10);

  models.surveyComments
    .findByPK(commentID)
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

const createSurveyComment = (req, res) => {
  const surveyComment = req.body.comment;
  const surveyID = parseInt(req.params.surveyID, 10);
  const userID = req.User_ID;

  if (!surveyComment) {
    res.status(400).send("Missing comment");
    return;
  }

  models.surveyComments
    .insert(surveyID, userID, surveyComment)
    .then(([result]) => {
      res
        .location(`/surveys/${surveyID}/comments/${result.insertId}`)
        .status(201)
        .send("Comment added");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSurveyComment = (req, res) => {
  const comment = req.body;
  const commentID = parseInt(req.params.id, 10);

  // If User is owner of the comment, proceed to update the comment
  models.surveyComments
    .update(commentID, comment)
    .then(() => {
      res.status(204).send("Comment updated");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSurveyComment = (req, res) => {
  const commentID = parseInt(req.params.id, 10);

  models.surveyComments
    .delete(commentID)
    .then(() => {
      res.status(204).send("Comment deleted");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getSurveyComments,
  getSurveyCommentByID,
  createSurveyComment,
  updateSurveyComment,
  deleteSurveyComment,
};
