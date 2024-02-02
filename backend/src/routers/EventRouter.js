const express = require("express");

const router = express.Router();
const eventController = require("../controllers/EventController");

const { verifyToken } = require("../middleware/auth");

// Verify if the user is the owner of the event
const verifyOwner = require("../middleware/verifyOwner");
const upload = require("../middleware/handleUpload");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all events
router.get("/events", eventController.getEvents);

// Get a specific event by ID
router.get("/events/:id", eventController.getEventByID);

// Create a new event
router.post("/events", upload.single("Image"), eventController.createEvent);

// Update an existing event
router.put("/events/:id", verifyOwner, eventController.updateEvent);

// Delete an event
router.delete("/events/:id", verifyOwner, eventController.deleteEvent);

module.exports = router;
