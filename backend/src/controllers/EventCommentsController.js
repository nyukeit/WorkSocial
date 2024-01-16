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

const getEventCommentByID = (req, res) => {
  const commentID = parseInt(req.params.commentID, 10);

  models.eventComments
    .findByPK(commentID)
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

const updateEventComment = (req, res) => {
  const eventComment = req.body;
  eventComment.commentID = parseInt(req.params.commentID, 10);

  models.eventComments
    .update(eventComment)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteEventComment = (req, res) => {
  const commentID = parseInt(req.params.commentID, 10);

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
  getEventCommentByID,
  createEventComment,
  updateEventComment,
  deleteEventComment,
};
