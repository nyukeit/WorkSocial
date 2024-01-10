// PostCommentLikeManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostCommentLikeManager extends AbstractManager {
  constructor() {
    super({ table: "post_comment_likes" });
  }

  insert(like) {
    return this.database.query(
      `INSERT INTO ${this.table} (Comment_ID, User_ID) VALUES (?, ?)`,
      [like.Comment_ID, like.User_ID]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Like_ID = ?`, [
      id,
    ]);
  }
}

module.exports = PostCommentLikeManager;
