// UserFollowersController.js
const models = require("../models");

const getUserFollowerss = (req, res) => {
  models.userFollowers
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserFollowersByID = (req, res) => {
  models.userFollowers
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
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

const createUserFollowers = (req, res) => {
  const userFollowers = req.body;

  // TODO validations (length, format...)

  models.userFollowers
    .insert(userFollowers)
    .then(([result]) => {
      res.location(`/userFollowerss/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUserFollowers = (req, res) => {
  const userFollowers = req.body;

  // TODO validations (length, format...)

  userFollowers.id = parseInt(req.params.id, 10);

  models.userFollowers
    .update(userFollowers)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUserFollowers = (req, res) => {
  models.userFollowers
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUserFollowerss,
  getUserFollowersByID,
  createUserFollowers,
  updateUserFollowers,
  deleteUserFollowers,
};
