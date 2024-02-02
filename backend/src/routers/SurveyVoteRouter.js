const express = require("express");

const router = express.Router();

const SurveyVoteController = require("../controllers/SurveyVoteController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/surveys/:surveyId/votes", SurveyVoteController.getVotesBySurveyId);
router.post("/surveys/:surveyId/votes", SurveyVoteController.castVote);

module.exports = router;
