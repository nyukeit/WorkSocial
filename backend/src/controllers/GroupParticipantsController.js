// GroupParticipantsController.js
const GroupParticipantsManager = require('../managers/GroupParticipantsManager');

const GroupParticipantsController = {
  getAllParticipants: (req, res) => {
    const { groupChatId } = req.params;

    GroupParticipantsManager.findAll(groupChatId)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  addParticipant: (req, res) => {
    const { groupChatId } = req.params;
    const { userId } = req.body;

    GroupParticipantsManager.insert(groupChatId, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  removeParticipant: (req, res) => {
    const { groupChatId, userId } = req.params;

    GroupParticipantsManager.delete(groupChatId, userId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = GroupParticipantsController;
