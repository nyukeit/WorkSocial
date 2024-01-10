// GroupChatManager.js
const AbstractManager = require("./AbstractManager");

class GroupChatManager extends AbstractManager {
  constructor() {
    super({ table: "groupchat" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  find(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE GroupChat_ID = ?`, [id]);
  }

  insert(groupChat) {
    const query = `
      INSERT INTO ${this.table}
        (GroupImage, GroupName, Content, User_ID)
      VALUES (?, ?, ?, ?)`;
    const values = [
      groupChat.GroupImage,
      groupChat.GroupName,
      groupChat.Content,
      groupChat.User_ID,
    ];
    return this.database.query(query, values);
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE GroupChat_ID = ?`, [id]);
  }
}

module.exports = GroupChatManager;
