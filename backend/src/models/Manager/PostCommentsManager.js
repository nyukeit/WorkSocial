// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostCommentManager extends AbstractManager {
  constructor() {
    super({ table: "post_comments" });
  }

  findByPK(commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }

  findByPostId(postID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Post_ID = ?`,
      [postID]
    );
  }

  insert(postID, userID, postComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Post_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [postID, userID, postComment]
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

module.exports = PostCommentManager;
