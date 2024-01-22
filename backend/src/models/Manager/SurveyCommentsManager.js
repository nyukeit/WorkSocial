// PostCommentManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyCommentsManager extends AbstractManager {
  constructor() {
    super({ table: "survey_comments" });
  }

  findBySurveyId(surveyID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ?`,
      [surveyID]
    );
  }

  findByPK(commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Comment_ID = ?`,
      [commentID]
    );
  }

  insert(surveyID, userID, surveyComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Survey_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [surveyID, userID, surveyComment]
    );
  }

  update(commentID, comment) {
    return this.database.query(
      `UPDATE ${this.table} SET Comment = ? WHERE Comment_ID = ?`,
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

module.exports = SurveyCommentsManager;
