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
  if (req.file) {
    post.Image = req.file.filename;
  }
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
  const { Title, Content, Visibility } = req.body;
  const hasNewImage = req.file !== undefined;
  const updatedPost = {
    Title,
    Content,
    Visibility,
    Post_ID: req.params.id,
  };

  if (hasNewImage) {
    updatedPost.Image = req.file.filename;
    models.post
      .update(updatedPost)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.post
      .updateWOImage(updatedPost)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }

  console.info(updatedPost);
  //   models.post
  //     // .update({ Title, Content, Image, Visibility, Post_ID: req.params.id })
  //     .update(updatedPost)
  //     .then(() => {
  //       res.sendStatus(204);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
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
