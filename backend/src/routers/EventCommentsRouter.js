const express = require("express");

const router = express.Router();

const eventCommentsController = require("../controllers/EventCommentsController");

const { verifyToken } = require("../middleware/auth");

const verifyOwner = require("../middleware/verifyOwner");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Trouver tous les commentaiers d'un evenement
router.get(
  "/events/:eventID/comments",
  eventCommentsController.getEventComments
);

router.get(
  "/events/:eventID/comments/:commentID",
  eventCommentsController.getEventCommentByID
);

router.post(
  "/events/:eventID/comments",
  eventCommentsController.createEventComment
);

router.put(
  "/events/:eventID/comments/:commentID",
  verifyOwner,
  eventCommentsController.updateEventComment
);

router.delete(
  "/events/:eventID/comments/:commentID",
  verifyOwner,
  eventCommentsController.deleteEventComment
);

module.exports = router;
