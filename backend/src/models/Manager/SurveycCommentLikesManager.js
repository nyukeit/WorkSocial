// SurveycCommentLikesManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveycCommentLikesManager extends AbstractManager {
  constructor() {
    super({ table: "surveyc_comment_likes" });
  }

  getSurveycCommentLikes() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  getSurveycCommentLikesByID(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  createSurveycCommentLikes(surveycCommentLikes) {
    return this.database.query(
      `INSERT INTO ${this.table} SET ?`,
      surveycCommentLikes
    );
  }

  updateSurveycCommentLikes(id, surveycCommentLikes) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      surveycCommentLikes,
      id,
    ]);
  }

  deleteSurveycCommentLikes(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = SurveycCommentLikesManager;
