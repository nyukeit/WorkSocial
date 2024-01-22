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

// Trouver un commentaire
router.get(
  "/events/:eventID/comments/:id",
  eventCommentsController.getEventCommentByID
);

// Creer un commentaire
router.post(
  "/events/:eventID/comments",
  eventCommentsController.createEventComment
);

// Modifier un commentaire
router.put(
  "/events/:eventID/comments/:id",
  verifyOwner,
  eventCommentsController.updateEventComment
);

// Supprimer un commentaire
router.delete(
  "/events/:eventID/comments/:id",
  verifyOwner,
  eventCommentsController.deleteEventComment
);

module.exports = router;
