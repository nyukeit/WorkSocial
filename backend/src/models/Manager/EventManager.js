const AbstractManager = require("../AbstractManager/AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "event" });
  }

  findByEventId(eventID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Event_ID = ?`,
      [eventID]
    );
  }

  insert(event) {
    return this.database.query(
      `
      INSERT INTO ${this.table} 
      (Event_ID, Image, EventName, StartDate, EndDate, StartTime, EndTime, Description, Visibility, ParticipantCount, Created_At, Updated_At, User_ID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        event.Created_At,
        event.Updated_At,
        event.User_ID,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Event_ID = ?`, [
      id,
    ]);
  }

  update(event) {
    return this.database.query(
      `UPDATE ${this.table}
       SET Image = ?, EventName = ?, StartDate = ?, EndDate = ?,
           StartTime = ?, EndTime = ?, Description = ?, Visibility = ?,
           ParticipantCount = ?, Created_At = ?, Updated_At = ?, User_ID = ?
       WHERE Event_ID = ?`,
      [
        event.Image,
        event.EventName,
        event.StartDate,
        event.EndDate,
        event.StartTime,
        event.EndTime,
        event.Description,
        event.Visibility,
        event.ParticipantCount,
        event.Created_At,
        event.Updated_At,
        event.User_ID,
        event.Event_ID,
      ]
    );
  }
}

module.exports = EventManager;
