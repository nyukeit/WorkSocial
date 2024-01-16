const express = require("express");

const router = express.Router();
const surveyController = require("../controllers/SurveyController");

const { verifyToken } = require("../middleware/auth");

// Verify if the user is the owner of the survey
const verifyOwner = require("../middleware/verifyOwner");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all surveys
router.get("/surveys", surveyController.getSurveys);

// Get a specific survey by ID
router.get("/surveys/:id", surveyController.getSurveyByID);

// Create a new survey
router.post("/surveys", surveyController.createSurvey);

// Update an existing survey
router.put("/surveys/:id", verifyOwner, surveyController.updateSurvey);

// Delete a survey
router.delete("/surveys/:id", verifyOwner, surveyController.deleteSurvey);

module.exports = router;
