// SurveyLikesManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyLikesManager extends AbstractManager {
  constructor() {
    super({ table: "survey_likes" });
  }

  getSurveyLikes() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  getSurveyLikesByID(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  createSurveyLikes(surveyLikes) {
    return this.database.query(`INSERT INTO ${this.table} SET ?`, surveyLikes);
  }

  updateSurveyLikes(id, surveyLikes) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      surveyLikes,
      id,
    ]);
  }

  deleteSurveyLikes(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = SurveyLikesManager;
