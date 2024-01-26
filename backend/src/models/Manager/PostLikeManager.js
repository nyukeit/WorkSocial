// managers/PostLikeManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostLikeManager extends AbstractManager {
  constructor() {
    super({ table: "post_likes" });
  }

  getLikesByPostId(postId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Post_ID = ?`,
      [postId]
    );
  }

  like(postId, userId) {
    return this.database.query(
      `INSERT INTO ${this.table} (Post_ID, User_ID) VALUES (?, ?)`,
      [postId, userId]
    );
  }

  unlike(postId, userId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Post_ID = ? AND User_ID = ?`,
      [postId, userId]
    );
  }
}

module.exports = PostLikeManager;
