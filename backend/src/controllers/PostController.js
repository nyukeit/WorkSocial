const models = require("../models");

const getPosts = (req, res) => {
  models.post
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPostById = (req, res) => {
  models.post
    .findByPK(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createPost = (req, res) => {
  const post = req.body;
  post.image = req.file?.path; // Assurez-vous de traiter correctement l'image
  const userID = req.User_ID;

  models.post
    .insert(post, userID)
    .then(([result]) => {
      res.location(`/posts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePost = (req, res) => {
  const post = req.body;
  post.id = parseInt(req.params.id, 10);

  models.post
    .update(post)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deletePost = (req, res) => {
  models.post
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
