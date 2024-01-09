const AbstractManager = require("../AbstractManager/AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  login(user) {
    const query = `select * from ${this.table} where Username = ? and PasswordHash = ?`;
    const values = [user.Username, user.PasswordHash];
    return this.database.query(query, values);
  }

  insert(user) {
    const query = `
      INSERT INTO ${this.table} 
        (Username, LastName, FirstName, BirthDate, Age, Address, Email, Phone, Biography, PasswordHash, Role, Gender) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      user.Username,
      user.LastName,
      user.FirstName,
      user.BirthDate,
      user.Age,
      user.Address,
      user.Email,
      user.Phone,
      user.Biography,
      user.PasswordHash,
      user.Role,
      user.Gender,
    ];
    return this.database.query(query, values);
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }
}

module.exports = userManager;
