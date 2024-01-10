// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostCommentManager extends AbstractManager {
  constructor() {
    super({ table: "post_comments" });
  }

  findByPostId(postId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Post_ID = ?`,
      [postId]
    );
  }

  insert(comment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Post_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [comment.Post_ID, comment.User_ID, comment.Comment]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Comment_ID = ?`,
      [id]
    );
  }
}

module.exports = PostCommentManager;
