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
  const surveyComment = {
    Survey_ID: req.params.surveyID,
    User_ID: req.body.User_ID,
    Comment: req.body.Comment,
  };

  models.surveyComments
    .insert(surveyComment)
    .then(([result]) => {
      res
        .location(`/surveys/${surveyComment.id}/comments/${result.insertId}`)
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSurveyCommentById = (req, res) => {
  const surveyComment = {
    Survey_ID: parseInt(req.params.surveyID, 10),
    Comment_ID: parseInt(req.params.commentID, 10),
    Comment: req.body.Comment,
  };
  models.surveyComments
    .update(surveyComment)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSurveyComment = (req, res) => {
  const surveyID = parseInt(req.params.surveyID, 10);
  const commentID = parseInt(req.params.commentID, 10);

  models.surveyComments
    .delete(surveyID, commentID)
    .then(() => {
      res.sendStatus(204);
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
