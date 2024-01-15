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

  findBySurveyCommentId(surveyID, commentID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ? AND Comment_ID = ?`,
      [surveyID, commentID]
    );
  }

  insert(surveyID, userID, surveyComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Survey_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [surveyID, userID, surveyComment]
    );
  }

  update(commentID, surveyID, userID, comment) {
    return this.database.query(
      `UPDATE ${this.table} SET Comment = ? WHERE Survey_ID =? AND Comment_ID = ? AND User_ID = ?`,
      [comment, surveyID, commentID, userID]
    );
  }

  delete(commentID, surveyID, userID) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Comment_ID = ? AND Survey_ID = ? AND User_ID = ?`,
      [commentID, surveyID, userID]
    );
  }
}

module.exports = SurveyCommentsManager;
