const express = require("express");

const router = express.Router();
const EventLikeController = require("../controllers/EventLikeController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.post("/events/:eventId/likes", EventLikeController.likeEvent);
router.delete(
  "/events/:eventId/likes/:userId",
  EventLikeController.unlikeEvent
);

module.exports = router;
