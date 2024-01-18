const AbstractManager = require("../AbstractManager/AbstractManager");

class EventCommentLikesManager extends AbstractManager {
  constructor() {
    super({ table: "event_comment_likes" });
  }

  getEventCommentLikes() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  findByEventCommentID(commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }

  createEventCommentLike(postCommentLikes) {
    return this.database.query(
      `INSERT INTO ${this.table} SET ?`,
      postCommentLikes
    );
  }

  updateEventCommentLike(id, postCommentLikes) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      postCommentLikes,
      id,
    ]);
  }

  deleteEventCommentLike(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = EventCommentLikesManager;
