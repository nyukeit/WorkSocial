// GroupParticipantsManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class GroupParticipantsManager extends AbstractManager {
  constructor() {
    super({ table: "groupparticipants" });
  }

  findAll(groupChatId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE GroupChat_ID = ?`,
      [groupChatId]
    );
  }

  insert(groupChatId, userId) {
    const query = `
      INSERT INTO ${this.table}
        (GroupChat_ID, User_ID)
      VALUES (?, ?)`;
    const values = [groupChatId, userId];
    return this.database.query(query, values);
  }

  delete(groupChatId, userId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE GroupChat_ID = ? AND User_ID = ?`,
      [groupChatId, userId]
    );
  }
}

module.exports = GroupParticipantsManager;
