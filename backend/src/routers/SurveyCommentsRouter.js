const express = require("express");

const router = express.Router();

const surveyCommentsController = require("../controllers/surveyCommentsController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Trouver tous les commentaiers d'un survey
router.get(
  "/surveys/:surveyID/comments",
  surveyCommentsController.getSurveyComments
);

// Trouver un seul commentaire d'un survey par son ID
router.get(
  "/surveys/:surveyID/comments/:commentID",
  surveyCommentsController.getSurveyCommentById
);

// Creer un commentaire sur un survey
router.post(
  "/surveys/:surveyID/comments",
  surveyCommentsController.createSurveyComment
);

// Mettre a jour un commentaire d'un survey par son ID
router.put(
  "/surveys/:surveyID/comments/:commentID",
  surveyCommentsController.updateSurveyCommentById
);

// Supprimer un commentaire d'un survey par son ID
router.delete(
  "/surveys/:surveyID/comments/:commentID",
  surveyCommentsController.deleteSurveyComment
);

module.exports = router;
