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
        (Username, LastName, FirstName, BirthDate, Age, Address, Email, Phone, Biography, hashedPassword, Role, Gender, ProfileImage)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
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
      user.ProfileImage,
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
