// controllers/PostLikeController.js
const PostLikeManager = require("../models/Manager/PostLikeManager");

const PostLikeController = {
  likePost: (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body; // Ou obtenir de req.user si authentifié

    PostLikeManager.like(postId, userId)
      .then(() => {
        res.status(201).send({ message: "Post liked successfully." });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error liking the post." });
      });
  },

  unlikePost: (req, res) => {
    const { postId, userId } = req.params;

    PostLikeManager.unlike(postId, userId)
      .then(() => {
        res.status(200).send({ message: "Post unliked successfully." });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Error unliking the post." });
      });
  },
};

module.exports = PostLikeController;
