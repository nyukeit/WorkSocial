const AbstractManager = require("../AbstractManager/AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "event" });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Event_ID = ?`,
      [id]
    );
  }

  insert(event, userID) {
    return this.database.query(
      `
      INSERT INTO ${this.table}
      (Event_ID, Image, EventName, StartDate, EndDate, StartTime, EndTime, Description, Visibility, ParticipantCount, User_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        event.Event_ID,
        event.Image,
        event.EventName,
        event.StartDate,
        event.EndDate,
        event.StartTime,
        event.EndTime,
        event.Description,
        event.Visibility,
        event.ParticipantCount,
        userID,
      ]
    );
  }

  update(event) {
    return this.database.query(
      `UPDATE ${this.table} SET Image = ?, EventName = ?, StartDate = ?, EndDate = ?,  StartTime = ?, EndTime = ?, Description = ?, Visibility = ? WHERE Event_ID = ?`,
      [
        event.Image,
        event.EventName,
        event.StartDate,
        event.EndDate,
        event.StartTime,
        event.EndTime,
        event.Description,
        event.Visibility,
        event.Event_ID,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Event_ID = ?`, [
      id,
    ]);
  }
}

module.exports = EventManager;
