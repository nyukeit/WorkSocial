const AbstractManager = require("../AbstractManager/AbstractManager");

class TokenBlacklistManager extends AbstractManager {
  constructor() {
    super({ table: "blacklisted_tokens" });
  }

  findByToken(token) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE jwtToken = ?`,
      [token]
    );
  }

  insert(token) {
    return this.database.query(
      `INSERT INTO ${this.table} (jwtToken) VALUES (?)`,
      [token]
    );
  }
}

module.exports = TokenBlacklistManager;
