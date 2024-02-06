// SurveyLikesController.js
const models = require("../models");

const getLikesByEventId = (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  models.eventLike
    .getLikesByEventId(eventId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const likeEvent = (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  models.eventLike
    .like(eventId, userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const unlikeEvent = (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;
  models.eventLike
    .unlike(eventId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getLikesByEventId,
  likeEvent,
  unlikeEvent,
};
