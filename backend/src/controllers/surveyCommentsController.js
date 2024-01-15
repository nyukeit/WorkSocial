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

const getSurveyCommentById = (req, res) => {
  const surveyID = parseInt(req.params.surveyID, 10);
  const commentID = parseInt(req.params.commentID, 10);

  models.surveyComments
    .findBySurveyCommentId(surveyID, commentID)
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

const updateSurveyCommentById = (req, res) => {
  const commentID = parseInt(req.params.commentID, 10);
  const surveyID = parseInt(req.params.surveyID, 10);
  const userID = req.User_ID;
  const { comment } = req.body;

  models.surveyComments
    .update(commentID, surveyID, userID, comment)
    .then(() => {
      res.status(204).send("Comment updated");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSurveyComment = (req, res) => {
  const surveyID = parseInt(req.params.surveyID, 10);
  const commentID = parseInt(req.params.commentID, 10);
  const userID = req.User_ID;

  models.surveyComments
    .delete(commentID, surveyID, userID)
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
  getSurveyCommentById,
  createSurveyComment,
  updateSurveyCommentById,
  deleteSurveyComment,
};
