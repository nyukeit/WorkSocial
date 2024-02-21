// SurveyLikesController.js
const models = require("../models");

const getInvitesByEventId = (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  models.eventInvite
    .getInvitesByEventId(eventId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const inviteUser = (req, res) => {
  const { eventId } = req.params;
  const { selectedUsers } = req.body;
  console.info(selectedUsers);
  const invitePromises = selectedUsers.map((id) => {
    return models.eventInvite.inviteUser(eventId, id);
  });

  Promise.all(invitePromises)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const unInviteUser = (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;
  models.eventInvite
    .unInviteUser(eventId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const acceptDeclineInvite = (req, res) => {
  const { eventId } = req.params;
  const { userId, action } = req.body;
  console.info(action, eventId, userId);
  models.eventInvite
    .acceptDeclineInvite(action, eventId, userId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getInvitesByEventId,
  inviteUser,
  unInviteUser,
  acceptDeclineInvite,
};
