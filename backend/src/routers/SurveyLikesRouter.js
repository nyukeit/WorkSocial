// SurveyLikesRouter.js
const express = require("express");

const router = express.Router();
const surveyLikesController = require("../controllers/SurveyLikesController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get(
  "/surveys/:surveyId/likes",
  surveyLikesController.getLikesBySurveyId
);

router.post("/surveys/:surveyId/likes", surveyLikesController.likeSurvey);

router.delete("/surveys/:surveyId/likes", surveyLikesController.unlikeSurvey);

module.exports = router;
