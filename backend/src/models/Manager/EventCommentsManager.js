// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class EventCommentsManager extends AbstractManager {
  constructor() {
    super({ table: "event_comments" });
  }

  findByEventId(eventID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Event_ID = ?`,
      [eventID]
    );
  }

  insert(eventComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Event_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [eventComment.Event_ID, eventComment.User_ID, eventComment.Comment]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Comment_ID = ?`,
      [id]
    );
  }
}

module.exports = EventCommentsManager;
