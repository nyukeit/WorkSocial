const models = require("../models");

const browse = (req, res) => {
  models.individualchat
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getIndividualchat = (req, res) => {
  models.individualchat
    .findByIndividualchatId(req.params.individualchatID)
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

const createIndividualchat = (req, res) => {
  const individualchat = req.body;

  models.individualchat
    .insert(individualchat)
    .then(([result]) => {
      res.location(`/individualchats/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteIndividualchat = (req, res) => {
  models.individualchat
    .delete(req.params.individualchatID)
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

const update = (req, res) => {
  const individualchat = req.body;
  individualchat.id = parseInt(req.params.individualchatID, 10);
  models.individualchat
    .update(individualchat)
    .then(([result]) => {
      if (result.length === 0) {
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
  browse,
  getIndividualchat,
  createIndividualchat,
  deleteIndividualchat,
  update,
};
