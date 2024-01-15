const express = require("express");

const router = express.Router();

const eventController = require("../controllers/eventController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/events", eventController.browse);
router.get("/events/:eventID", eventController.getEvent);
router.post("/events", eventController.createEvent);
router.put("/events/:eventID", eventController.update); // Utilisez PUT pour la modification
router.delete("/events/:eventID", eventController.deleteEvent);

module.exports = router;
