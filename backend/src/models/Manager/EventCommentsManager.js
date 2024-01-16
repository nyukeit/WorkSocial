// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class EventCommentsManager extends AbstractManager {
  constructor() {
    super({ table: "event_comments" });
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [id]
    );
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

  update(eventComment) {
    return this.database.query(
      `UPDATE ${this.table}
      SET Event_ID = ?, Comment = ? WHERE Comment_ID = ?`,
      [eventComment.Event_ID, eventComment.Comment, eventComment.Comment_ID]
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
