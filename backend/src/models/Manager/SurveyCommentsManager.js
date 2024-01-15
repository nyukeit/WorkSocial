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

  insert(surveyComment) {
    return this.database.query(
      `INSERT INTO ${this.table} (Survey_ID, User_ID, Comment) VALUES (?, ?, ?)`,
      [surveyComment.Survey_ID, surveyComment.User_ID, surveyComment.Comment]
    );
  }

  update(surveyComment) {
    return this.database.query(
      `UPDATE ${this.table} SET Comment = ? WHERE Survey_ID =? AND Comment_ID = ?`,
      [surveyComment.Comment, surveyComment.Survey_ID, surveyComment.Comment_ID]
    );
  }

  delete(surveyID, commentID) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Survey_ID = ? AND Comment_ID = ?`,
      [surveyID, commentID]
    );
  }
}

module.exports = SurveyCommentsManager;
