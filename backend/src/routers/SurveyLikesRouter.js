// SurveyLikesRouter.js
const express = require("express");

const router = express.Router();
const surveyLikesController = require("../controllers/SurveyLikesController");

const { verifyToken } = require("../middleware/auth");

router.use(verifyToken);
router.get("/surveyLikes", surveyLikesController.getSurveyLikes);

router.get("/surveyLikes/:id", surveyLikesController.getSurveyLikesByID);

router.post("/surveyLikes", surveyLikesController.createSurveyLikes);

router.put("/surveyLikes/:id", surveyLikesController.updateSurveyLikes);

router.delete("/surveyLikes/:id", surveyLikesController.deleteSurveyLikes);

module.exports = router;
