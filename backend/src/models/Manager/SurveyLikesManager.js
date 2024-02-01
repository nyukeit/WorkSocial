// managers/SurveyLikeManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyLikeManager extends AbstractManager {
  constructor() {
    super({ table: "survey_likes" });
  }

  getLikesBySurveyId(surveyId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ?`,
      [surveyId]
    );
  }

  like(surveyId, userId) {
    return this.database.query(
      `INSERT INTO ${this.table} (Survey_ID, User_ID) VALUES (?, ?)`,
      [surveyId, userId]
    );
  }

  unlike(surveyId, userId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Survey_ID = ? AND User_ID = ?`,
      [surveyId, userId]
    );
  }
}

module.exports = SurveyLikeManager;
