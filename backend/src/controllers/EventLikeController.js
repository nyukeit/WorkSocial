// EventLikeController.js
const EventLikeManager = require("../models/Manager/EventLikeManager");

const EventLikeController = {
  likeEvent: (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    EventLikeManager.like(eventId, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  unlikeEvent: (req, res) => {
    const { eventId, userId } = req.params;

    EventLikeManager.unlike(eventId, userId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};

module.exports = EventLikeController;
