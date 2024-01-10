const express = require("express");

const router = express.Router();

const eventCommentsController = require("../controllers/eventCommentsController");

// Trouver tous les commentaiers d'un evenement
router.get(
  "/events/:eventID/comments",
  eventCommentsController.getEventComments
);

router.post(
  "/events/:eventID/comments",
  eventCommentsController.createEventComment
);
router.delete(
  "/events/:eventID/comments/:commentID",
  eventCommentsController.deleteEventComment
);

module.exports = router;
