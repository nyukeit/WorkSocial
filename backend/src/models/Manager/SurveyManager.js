const AbstractManager = require("../AbstractManager/AbstractManager");

class SurveyManager extends AbstractManager {
  constructor() {
    super({ table: "survey" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Survey_ID = ?`,
      [id]
    );
  }

  insert(survey, userID) {
    return this.database.query(
      `INSERT INTO ${this.table} (Image, Title, Content, Visibility, Option1, Option2, Option3, Option4, User_ID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        survey.Image,
        survey.Title,
        survey.Content,
        survey.Visibility,
        survey.Option1,
        survey.Option2,
        survey.Option3,
        survey.Option4,
        userID,
      ]
    );
  }

  update(survey) {
    return this.database.query(
      `UPDATE ${this.table}
      SET Image = ?, Title = ?, Content = ?, Visibility = ?, Option1 = ?, Option2 = ?, Option3 = ?, Option4 = ? WHERE Survey_ID = ?`,
      [
        survey.Image,
        survey.Title,
        survey.Content,
        survey.Visibility,
        survey.Option1,
        survey.Option2,
        survey.Option3,
        survey.Option4,
        survey.id,
      ]
    );
  }

  updateWOImage(survey) {
    return this.database.query(
      `UPDATE ${this.table}
      SET Title = ?, Content = ?, Visibility = ?, Option1 = ?, Option2 = ?, Option3 = ?, Option4 = ? WHERE Survey_ID = ?`,
      [
        survey.Title,
        survey.Content,
        survey.Visibility,
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
