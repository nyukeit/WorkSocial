const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyManager extends AbstractManager {
  constructor() {
    super({ table: "survey" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  find(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ?`,
      [id]
    );
  }

  insert(survey) {
    return this.database.query(
      `INSERT INTO ${this.table} (Title, Content, Visibility, Option1, Option2, Option3, Option4) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        survey.Title,
        survey.Content,
        survey.Visibility,
        survey.Option1,
        survey.Option2,
        survey.Option3,
        survey.Option4,
      ]
    );
  }

  update(survey) {
    return this.database.query(
      `UPDATE ${this.table}
      SET Image = ?, Title = ?, Content = ?, VoteCount = ?, Visibility = ?, User_ID = ?, Option1 = ?, Option2 = ?, Option3 = ?, Option4 = ? WHERE Survey_ID = ?`,
      [
        survey.Image,
        survey.Title,
        survey.Content,
        survey.VoteCount,
        survey.Visibility,
        survey.User_ID,
        survey.Option1,
        survey.Option2,
        survey.Option3,
        survey.Option4,
        survey.id,
      ]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Survey_ID = ?`,
      [id]
    );
  }
}

module.exports = SurveyManager;
