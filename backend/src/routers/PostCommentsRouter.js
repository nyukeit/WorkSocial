const express = require("express");

const router = express.Router();

const postCommentsController = require("../controllers/PostCommentsController");

const { verifyToken } = require("../middleware/auth");

const verifyOwner = require("../middleware/verifyOwner");

// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Trouver tous les commentaiers d'un evenement
router.get("/posts/:postID/comments", postCommentsController.getPostComments);

// Trouver un commentaire
router.get(
  "/posts/:postID/comments/:id",
  postCommentsController.getPostCommentByID
);

// Creer un commentaire
router.post(
  "/posts/:postID/comments",
  postCommentsController.createPostComment
);

// Modifier un commentaire
router.put(
  "/posts/:postID/comments/:id",
  verifyOwner,
  postCommentsController.updatePostComment
);

// Supprimer un commentaire
router.delete(
  "/posts/:postID/comments/:id",
  verifyOwner,
  postCommentsController.deletePostComment
);

module.exports = router;
