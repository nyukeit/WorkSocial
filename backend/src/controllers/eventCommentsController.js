// PostCommentController.js
// const EventCommentsManager = require("../models/Manager/EventCommentsManager");
const models = require("../models");

const getEventComments = (req, res) => {
  const eventID = parseInt(req.params.eventID, 10);

  models.eventComments
    .findByEventId(eventID)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createEventComment = (req, res) => {
  const eventComment = {
    Event_ID: req.params.eventID,
    User_ID: req.body.User_ID,
    Comment: req.body.Comment,
  };

  models.eventComments
    .insert(eventComment)
    .then(([result]) => {
      res
        .location(
          `/events/${eventComment.Event_ID}/comments/${result.insertId}`
        )
        .sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteEventComment = (req, res) => {
  const { commentID } = req.params.commentID;

  models.eventComments
    .delete(commentID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getEventComments,
  createEventComment,
  deleteEventComment,
};
