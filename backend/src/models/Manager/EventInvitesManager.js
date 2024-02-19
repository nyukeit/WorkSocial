// EventLikeManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class EventInviteManager extends AbstractManager {
  constructor() {
    super({ table: "event_invites" });
  }

  getInvitesByEventId(eventId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Event_ID = ?`,
      [eventId]
    );
  }

  inviteUser(eventId, userId) {
    return this.database.query(
      `INSERT INTO ${this.table} (Event_ID, User_ID) VALUES (?, ?)`,
      [eventId, userId]
    );
  }

  unInviteUser(eventId, userId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Event_ID = ? AND User_ID = ?`,
      [eventId, userId]
    );
  }

  acceptDeclineInvite(action, eventId, userId) {
    return this.database.query(
      `UPDATE ${this.table} SET invite_status = ? WHERE Event_ID = ? AND User_ID = ?`,
      [action, eventId, userId]
    );
  }
}

module.exports = EventInviteManager;
