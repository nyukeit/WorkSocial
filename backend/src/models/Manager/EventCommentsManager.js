// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class EventCommentsManager extends AbstractManager {
  constructor() {
    super({ table: "event_comments" });
  }

  findByPK(commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }

  findByEventId(eventID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Event_ID = ?`,
      [eventID]
    );
  }

  insert(eventID, userID, eventComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Event_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [eventID, userID, eventComment]
    );
  }

  update(commentID, comment) {
    return this.database.query(
      `UPDATE ${this.table}
      SET Comment = ? WHERE Comment_ID = ?`,
      [comment.comment, commentID]
    );
  }

  delete(commentID) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }
}

module.exports = EventCommentsManager;
