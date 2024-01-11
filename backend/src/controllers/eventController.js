// PostCommentController.js
// const EventCommentsManager = require("../models/Manager/EventCommentsManager");
const models = require("../models");

const browse = (req, res) => {
  models.event
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getEvent = (req, res) => {
  models.event
    .findByEventId(req.params.eventID)
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

const createEvent = (req, res) => {
  const event = req.body;

  models.event
    .insert(event)
    .then(([result]) => {
      res.location(`/events/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteEvent = (req, res) => {
  models.event
    .delete(req.params.eventID)
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
  const event = req.body;
  event.id = parseInt(req.params.eventID, 10);
  models.event
    .update(event)
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
  getEvent,
  createEvent,
  deleteEvent,
  update,
};
