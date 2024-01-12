const AbstractManager = require("../AbstractManager/AbstractManager");

class EventCommentLikeManager extends AbstractManager {
  constructor() {
    super({ table: "event_comment_like" });
  }

  findByCommentId(commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }

  insert(like) {
    return this.database.query(
      `INSERT INTO ${this.table} (Comment_ID, User_ID, Liked_At) VALUES (?, ?, ?)`,
      [like.Comment_ID, like.User_ID, like.Liked_At]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Like_ID = ?`, [
      id,
    ]);
  }
}

module.exports = EventCommentLikeManager;
