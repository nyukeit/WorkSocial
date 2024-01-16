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
  const commentID = parseInt(req.params.commentID, 10);

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

const updateSurveyCommentById = async (req, res) => {
  const commentID = parseInt(req.params.commentID, 10);
  const surveyID = parseInt(req.params.surveyID, 10);
  const userID = req.User_ID;
  const { comment } = req.body;

  // Check if the user is the owner of the comment
  const [foundComment] = await models.surveyComments.findByPK(commentID);
  console.info(foundComment[0].User_ID);
  // If the user is not the owner of the comment, return a 403 error
  if (foundComment[0].User_ID !== userID) {
    res.status(403).send("You are not the owner of this comment");
    return;
  }

  // If User is owner of the comment, proceed to update the comment
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
