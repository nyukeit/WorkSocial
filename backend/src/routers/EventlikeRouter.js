const express = require("express");

const router = express.Router();
const EventLikeController = require("../controllers/EventLikeController");

const { verifyToken } = require("../middleware/auth");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

router.get("/events/:eventId/likes", EventLikeController.getlikes);
router.post("/events/:eventId/likes", EventLikeController.likeEvent);
router.delete("/events/:eventId/likes", EventLikeController.unlikeEvent);

module.exports = router;
