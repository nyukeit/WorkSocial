const models = require("../models");

const getEvents = (req, res) => {
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

const getEventByID = (req, res) => {
  models.event
    .findByPK(req.params.id)
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
  const userID = req.User_ID;
  if (req.file) {
    event.Image = req.file.filename;
  }
  console.info("creation evennement", event);
  models.event
    .insert(event, userID)
    .then(([result]) => {
      res.location(`/events/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateEvent = (req, res) => {
  const event = req.body;
  event.id = parseInt(req.params.id, 10);

  models.event
    .update(event)
    .then(() => {
      res.status(204).send("Successfully updated Event Details");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteEvent = (req, res) => {
  models.event
    .delete(req.params.id)
    .then(() => {
      res.status(204).send("Successfully deleted Event");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getEvents,
  getEventByID,
  createEvent,
  updateEvent,
  deleteEvent,
};
