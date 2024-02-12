const AbstractManager = require("../AbstractManager/AbstractManager");

class CompanyUserManager extends AbstractManager {
  constructor() {
    super({ table: "company_user" });
  }

  findByCompanyID(CompanyID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE CompanyID = ?`,
      [CompanyID]
    );
  }

  findByUserID(UserID) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE UserID = ?`, [
      UserID,
    ]);
  }

  findByCompanyIDAndUserID(CompanyID, UserID) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE CompanyID = ? AND UserID = ?`,
      [CompanyID, UserID]
    );
  }

  addUsersToCompany(companyId, userId, role) {
    console.info(companyId);
    const values = [companyId, userId, role];
    console.info(values);
    const query = `
      INSERT INTO ${this.table} (Company_ID, User_ID, Role)
      VALUES (?, ?, ?)`;
    return this.database.query(query, values);
  }

  update(CompanyID, UserID, Role) {
    return this.database.query(
      `UPDATE ${this.table} SET Role = ? WHERE Company_ID = ? AND User_ID = ?`,
      [Role, CompanyID, UserID]
    );
  }

  removeUserFromCompany(companyID, userID) {
    console.info(companyID, "fqsfd");
    return this.database.query(
      `DELETE FROM ${this.table} WHERE Company_ID = ? AND User_ID = ?`,
      [companyID, userID] // Utilisez un tableau pour passer les valeurs des paramètres
    );
  }
}

module.exports = CompanyUserManager;
