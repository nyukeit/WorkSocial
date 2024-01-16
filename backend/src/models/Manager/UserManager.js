const AbstractManager = require("../AbstractManager/AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE User_ID = ?`,
      [id]
    );
  }

  login(user) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE Email = ?`, [
      user.Email,
    ]);
  }

  insert(user) {
    const query = `
      INSERT INTO ${this.table} 
        (Username, LastName, FirstName, BirthDate, Address, Email, Phone, Biography, hashedPassword, Role, Gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      user.Username,
      user.LastName,
      user.FirstName,
      user.BirthDate,
      user.Address,
      user.Email,
      user.Phone,
      user.Biography,
      user.hashedPassword,
      user.Role,
      user.Gender,
    ];
    return this.database.query(query, values);
  }

  update(user, userID) {
    const query = `
      UPDATE ${this.table} 
      SET Username = ?, LastName = ?, FirstName = ?, BirthDate = ?, Address = ?, Email = ?, Phone = ?, Biography = ?, Role = ?, Gender = ?
      WHERE User_ID = ?`;
    const values = [
      user.Username,
      user.LastName,
      user.FirstName,
      user.BirthDate,
      user.Address,
      user.Email,
      user.Phone,
      user.Biography,
      user.Role,
      user.Gender,
      userID,
    ];
    return this.database.query(query, values);
  }

  delete(email) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE Email = ?`, [
      email,
    ]);
  }
}

module.exports = userManager;
