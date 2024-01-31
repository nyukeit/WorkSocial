const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyVoteManager extends AbstractManager {
  constructor() {
    super({ table: "survey_votes" });
  }

  getVotesBySurveyId(surveyId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ?`,
      [surveyId]
    );
  }

  castVote(surveyId, userId, votedOption) {
    return this.database.query(
      `INSERT INTO ${this.table} (Survey_ID, User_ID, Voted_For) VALUES (?, ?, ?)`,
      [surveyId, userId, votedOption]
    );
  }
}

module.exports = SurveyVoteManager;
