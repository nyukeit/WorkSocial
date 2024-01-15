// UserFollowersManager.js
const AbstractManager = require("../AbstractManager/AbstractManager");

class UserFollowersManager extends AbstractManager {
  constructor() {
    super({ table: "user_followers" });
  }

  getUserFollowerss() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }

  getUserFollowersByID(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  createUserFollowers(userFollowers) {
    return this.database.query(
      `INSERT INTO ${this.table} SET ?`,
      userFollowers
    );
  }

  updateUserFollowers(id, userFollowers) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      userFollowers,
      id,
    ]);
  }

  deleteUserFollowers(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = UserFollowersManager;
