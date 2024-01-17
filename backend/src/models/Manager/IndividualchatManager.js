const AbstractManager = require("../AbstractManager/AbstractManager");

class IndividualchatManager extends AbstractManager {
  constructor() {
    super({ table: "individualchat" });
  }

  findByIndividualchatId(individualchatID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Chat_ID = ?`,
      [individualchatID]
    );
  }

  insert(individualchat) {
    return this.database.query(
      `
      INSERT INTO ${this.table} 
      (Chat_ID, Content, Created_At, Updated_At, User_ID1, User_ID2) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        individualchat.Chat_ID,
        individualchat.Content,
        individualchat.Created_At,
        individualchat.Updated_At,
        individualchat.User_ID1,
        individualchat.User_ID2,
      ]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE Chat_ID = ?`, [
      id,
    ]);
  }

  update(individualchat) {
    return this.database.query(
      `UPDATE ${this.table}
       SET Content = ?, Created_At = ?, Updated_At = ?, User_ID1 = ?, User_ID2 = ? 
       WHERE Chat_ID = ?`,
      [
        individualchat.Content,
        individualchat.Created_At,
        individualchat.Updated_At,
        individualchat.User_ID1,
        individualchat.User_ID2,
        individualchat.Chat_ID,
      ]
    );
  }
}

module.exports = IndividualchatManager;
