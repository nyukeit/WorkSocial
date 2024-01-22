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
  const commentID = parseInt(req.params.id, 10);

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
  const eventComment = req.body.comment;
  const eventID = parseInt(req.params.eventID, 10);
  const userID = req.User_ID;

  if (!eventComment) {
    res.status(400).send("Missing comment");
    return;
  }

  models.eventComments
    .insert(eventID, userID, eventComment)
    .then(([result]) => {
      res
        .location(
          `/events/${eventComment.Event_ID}/comments/${result.insertId}`
        )
        .status(201)
        .send("Comment created");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateEventComment = (req, res) => {
  const comment = req.body;
  const commentID = parseInt(req.params.id, 10);

  models.eventComments
    .update(commentID, comment)
    .then(() => {
      res.status(204).send("Comment updated");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteEventComment = (req, res) => {
  const commentID = parseInt(req.params.id, 10);

  models.eventComments
    .delete(commentID)
    .then(() => {
      res.status(204).send("Comment deleted");
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
