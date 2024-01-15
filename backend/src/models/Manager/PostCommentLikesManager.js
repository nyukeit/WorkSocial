// PostCommentLikesManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class PostCommentLikesManager extends AbstractManager {
  constructor() {
    super({ table: "post_comment_likes" });
  }

  getPostCommentLikes() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  getPostCommentLikesByID(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  createPostCommentLikes(postCommentLikes) {
    return this.database.query(
      `INSERT INTO ${this.table} SET ?`,
      postCommentLikes
    );
  }

  updatePostCommentLikes(id, postCommentLikes) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      postCommentLikes,
      id,
    ]);
  }

  deletePostCommentLikes(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = PostCommentLikesManager;
