// SurveyRouter.js
const express = require("express");

const router = express.Router();
const surveyController = require("../controllers/surveyController");

const verifyToken = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all surveys
router.get("/surveys", surveyController.getSurveys);

// Get a specific survey by ID
router.get("/surveys/:id", surveyController.getSurveyByID);

// Create a new survey
router.post("/surveys", surveyController.createSurvey);

// Update an existing survey
router.put("/surveys/:id", surveyController.updateSurvey);

// Delete a survey
router.delete("/surveys/:id", surveyController.deleteSurvey);

module.exports = router;
