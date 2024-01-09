// GroupChatController.js
const GroupChatManager = require('../managers/GroupChatManager');

const GroupChatController = {
  getAllGroupChats: (req, res) => {
    GroupChatManager.findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  getGroupChatById: (req, res) => {
    const { groupChatId } = req.params;

    GroupChatManager.find(groupChatId)
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
  },

  createGroupChat: (req, res) => {
    const groupChat = req.body;

    GroupChatManager.insert(groupChat)
      .then(([result]) => {
        res.location(`/groupchats/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  deleteGroupChat: (req, res) => {
    const { groupChatId } = req.params;

    GroupChatManager.delete(groupChatId)
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
  }
};

module.exports = GroupChatController;
